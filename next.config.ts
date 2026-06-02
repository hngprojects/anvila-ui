import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['ciera-perichaetial-gloopily.ngrok-free.dev'],
  experimental: {
    authInterrupts: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;