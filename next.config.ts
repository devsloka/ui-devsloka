import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // or 'DENY' if you never want embedding
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self';", // Modern protection
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "images.pexels.com",
      "avatars.githubusercontent.com",
      "source.unsplash.com",
    ],
  },
};

export default nextConfig;
