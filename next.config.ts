import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Link",
    value: '<https://ui.devsloka.in/llms.txt>; rel="describedby"',
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self';",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];
const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "images.pexels.com",
      "avatars.githubusercontent.com",
      "source.unsplash.com",
    ].map((hostname) => ({ protocol: "https" as const, hostname })),
  },
};

export default nextConfig;
