/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Special_Gift/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
