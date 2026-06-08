import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — Firebase Hosting serves the generated `out/` dir.
  output: "export",
  // next/image optimization isn't available in a static export.
  images: { unoptimized: true },
  // Emit directory-style routes (out/blog/slug/index.html) so Firebase serves
  // clean URLs without extra rewrites.
  trailingSlash: true,
};

export default nextConfig;
