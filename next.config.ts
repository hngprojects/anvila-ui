import type { NextConfig } from "next";

const apiOrigin = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL)?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  allowedDevOrigins: ['ciera-perichaetial-gloopily.ngrok-free.dev'],
  experimental: {
    authInterrupts: true,
  },
  ...(apiOrigin && {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${apiOrigin}/api/:path*`,
        },
      ];
    },
  }),
};

export default nextConfig;