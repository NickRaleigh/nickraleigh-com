import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  experimental: {
    agentUpgrade: "security",
  },
  // Dev-server only (no effect on the static export): 127.0.0.1 and
  // localhost are different origins to Next's dev-server cross-origin
  // check, which otherwise lets the page's HTML load but silently blocks
  // the client from hydrating — scripts all 200, nothing on the page ever
  // becomes interactive. Without this, http://127.0.0.1:3000 looks like
  // "other javascript isn't loading."
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
