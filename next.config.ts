import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['ciera-perichaetial-gloopily.ngrok-free.dev'],
  experimental: {
    authInterrupts: true,
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.staging.anvila.hng14.com';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;