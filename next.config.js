/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // This is needed for Docker deployment
    outputFileTracingRoot: process.cwd(),
  },
};

module.exports = nextConfig;
