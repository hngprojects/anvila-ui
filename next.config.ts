import type { NextConfig } from "next";

const apiOrigin = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL)?.replace(/\/$/, "");

if (!apiOrigin) {
  throw new Error("API_URL must be set for /api rewrites.");
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ['ciera-perichaetial-gloopily.ngrok-free.dev'],
  experimental: {
    authInterrupts: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
         destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;