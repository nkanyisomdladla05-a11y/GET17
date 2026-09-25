import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  webpack: (config, { dev }) => {
    if (dev) {
      config.output = config.output || {};
      // This machine compiles 3D chunks slower than webpack's 2 minute default.
      config.output.chunkLoadTimeout = 600000;
    }
    return config;
  },
};

export default nextConfig;
