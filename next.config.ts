import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.freepik.com', port: '', pathname: '/premium-vector/*' },
    ],
  },
};

export default nextConfig;
