/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    env: {
        // HOST
        HOST_API_KEY: process.env.HOST_API_KEY
    },
};

export default nextConfig;