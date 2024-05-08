/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    trailingSlash: true,
    env: {
        // HOST
        HOST_API_KEY: process.env.HOST_API_KEY,
    },
};

export default nextConfig;