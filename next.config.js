/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  experimental: {
    // Include the data/ directory in serverless function bundles (Vercel)
    outputFileTracingRoot: process.cwd(),
    outputFileTracingIncludes: {
      "/": ["./data/**/*"],
    },
  },
};

module.exports = nextConfig;
