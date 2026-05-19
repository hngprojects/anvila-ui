import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['ciera-perichaetial-gloopily.ngrok-free.dev'],
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
