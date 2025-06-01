/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Vercel, we don't need the standalone output
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
