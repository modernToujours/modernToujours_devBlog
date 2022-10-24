/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // plugins: ["@emotion"],
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "googleusercontent.com",
      `${process.env.S3_UPLOAD_BUCKET}.${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
    ],
  },
};

module.exports = nextConfig;
