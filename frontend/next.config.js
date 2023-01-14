/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: "https://hts.onfirebyte.xyz",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    compiler: {
        removeConsole: true,
    },
};

module.exports = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
})(nextConfig);
