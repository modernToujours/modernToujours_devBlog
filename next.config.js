/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
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
  rewrites: async () => {
    return [
      {
        source: process.env.S3_SOURCE_PATH,
        destination: process.env.S3_DESTINATION_URL,
      },
    ];
  },
};

module.exports = nextConfig;
