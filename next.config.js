/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  plugins: ["@emotion"],
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
