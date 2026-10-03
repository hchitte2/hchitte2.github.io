"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Music } from "lucide-react";

interface NowPlayingData {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumArt: string | null;
  url: string | null;
  playedAt: string | null;
}

const POLL_MS = 30_000;

function Equalizer() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Music className="size-4 text-accent" aria-hidden="true" />;
  }

  return (
    <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
      {[0, 0.3, 0.15].map((delay, i) => (
        <motion.span
          key={i}
          className="w-0.5 origin-bottom rounded-full bg-accent"
          style={{ height: "100%" }}
          animate={{ scaleY: [0.35, 1, 0.55, 0.9, 0.35] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay }}
        />
      ))}
    </span>
  );
}

function Artwork({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
        <Music className="size-4 text-muted-foreground" aria-hidden="true" />
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="size-10 shrink-0 rounded-md object-cover"
    />
  );
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/now-playing.json", { cache: "no-cache" });
        if (!res.ok) return;
        const json: NowPlayingData = await res.json();
        if (!cancelled) setData(json);
      } catch {
        // Keep whatever we last had; the strip just goes stale rather than erroring.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    // Only poll while the tab is actually being looked at.
    const interval = setInterval(() => {
      if (!document.hidden) load();
    }, POLL_MS);

    function onVisibility() {
      if (!document.hidden) load();
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="size-10 shrink-0 rounded-md bg-muted" />
        <span className="min-w-0 flex-1 space-y-1.5">
          <span className="block h-3.5 w-40 max-w-full rounded-md bg-muted" />
          <span className="block h-3 w-28 max-w-full rounded-md bg-muted" />
        </span>
      </div>
    );
  }

  if (!data?.title) return null;

  const meta = [data.artist, data.album].filter(Boolean).join(" · ");
  const row = (
    <>
      <Artwork src={data.albumArt} alt={data.album ?? data.title} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{data.title}</span>
        {meta && <span className="block truncate text-xs text-muted-foreground">{meta}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {data.isPlaying ? (
          <Equalizer />
        ) : (
          <>
            <Music className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Last played</span>
          </>
        )}
      </span>
    </>
  );

  if (!data.url) {
    return <div className="flex items-center gap-3">{row}</div>;
  }

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-md transition-colors duration-150 hover:text-accent"
    >
      {row}
    </a>
  );
}
