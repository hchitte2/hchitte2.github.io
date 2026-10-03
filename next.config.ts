import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so the whole site is exported to out/.
  output: "export",
  outputFileTracingRoot: __dirname,
  devIndicators: false,
  experimental: {
    devtoolSegmentExplorer: false,
  },
  images: {
    // Static export has no image optimizer server; next/image renders the src as-is.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "lastfm.freetls.fastly.net" },
      // Last.fm actually serves art from lastfm-img.freetls.fastly.net today; cover the siblings.
      { protocol: "https", hostname: "**.freetls.fastly.net" },
    ],
  },
};

export default nextConfig;
