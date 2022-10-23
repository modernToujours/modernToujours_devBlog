/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  plugins: ["@emotion"],
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
