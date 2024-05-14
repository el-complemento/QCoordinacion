/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    env: {
        // HOST
        HOST_API_KEY: process.env.HOST_API_KEY
    },
    /* webpack: (config, context) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
      }
      return config
    } */
};

export default nextConfig;