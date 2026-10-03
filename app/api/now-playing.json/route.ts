import { NextResponse } from "next/server";

// The site is a static export on GitHub Pages, so this runs once per build and is written to
// out/api/now-playing.json. The deploy workflow rebuilds on a schedule to keep it fresh, which
// keeps the Last.fm key inside CI instead of shipping it to the browser.
export const dynamic = "force-static";

const ENDPOINT = "https://ws.audioscrobbler.com/2.0/";

/** Shape returned to the client. `title: null` means "render nothing". */
interface NowPlaying {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumArt: string | null;
  url: string | null;
  playedAt: string | null;
}

const EMPTY: NowPlaying = {
  isPlaying: false,
  title: null,
  artist: null,
  album: null,
  albumArt: null,
  url: null,
  playedAt: null,
};

interface LastfmImage {
  "#text"?: string;
  size?: string;
}

interface LastfmTrack {
  name?: string;
  url?: string;
  artist?: { "#text"?: string };
  album?: { "#text"?: string };
  image?: LastfmImage[];
  date?: { uts?: string };
  "@attr"?: { nowplaying?: string };
}

/**
 * next/image throws on hosts missing from remotePatterns, so drop anything unexpected
 * rather than letting a surprise CDN break the footer — the UI falls back to an icon.
 */
function isAllowedHost(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".freetls.fastly.net");
  } catch {
    return false;
  }
}

/** Last.fm returns images small→extralarge; take the last one that actually has a URL. */
function largestImage(images: LastfmImage[] | undefined): string | null {
  if (!images?.length) return null;
  for (let i = images.length - 1; i >= 0; i--) {
    const url = images[i]?.["#text"]?.trim();
    if (url && isAllowedHost(url)) return url;
  }
  return null;
}

function nonEmpty(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function json(body: NowPlaying) {
  return NextResponse.json(body, {
    status: 200,
    headers: {
      // Clients (and any CDN in front) should not poll faster than the route revalidates.
      "Cache-Control": "public, max-age=30, s-maxage=30, stale-while-revalidate=60",
    },
  });
}

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) return json(EMPTY);

  try {
    const params = new URLSearchParams({
      method: "user.getrecenttracks",
      user: username,
      api_key: apiKey,
      format: "json",
      limit: "1",
    });

    // force-cache is required for build-time rendering; every CI build starts with an empty
    // cache, so each deploy still gets a fresh read.
    const res = await fetch(`${ENDPOINT}?${params}`, { cache: "force-cache" });
    if (!res.ok) return json(EMPTY);

    const data: { recenttracks?: { track?: LastfmTrack | LastfmTrack[] } } = await res.json();

    // Last.fm returns an object rather than an array when there's exactly one track.
    const raw = data.recenttracks?.track;
    const track = Array.isArray(raw) ? raw[0] : raw;
    const title = nonEmpty(track?.name);
    if (!track || !title) return json(EMPTY);

    // A build-time snapshot can be up to one deploy interval old, so a track that was
    // "now playing" when we built is reported as last played at build time rather than
    // showing a live equalizer for a song that has long since ended.
    const wasPlaying = track["@attr"]?.nowplaying === "true";
    const uts = track.date?.uts;
    const playedAt = wasPlaying
      ? new Date().toISOString()
      : uts
        ? new Date(Number(uts) * 1000).toISOString()
        : null;

    return json({
      isPlaying: false,
      title,
      artist: nonEmpty(track.artist?.["#text"]),
      album: nonEmpty(track.album?.["#text"]),
      albumArt: largestImage(track.image),
      url: nonEmpty(track.url),
      playedAt,
    });
  } catch {
    // Deliberately not logged: fetch errors embed the request URL, which contains the API key,
    // and Actions logs on a public repo are public.
    return json(EMPTY);
  }
}
