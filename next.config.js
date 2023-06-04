const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    redirects() {
        return [
            {
                source: '/posts/:path',
                destination: '/post/:path',
                permanent: true,
            },
        ];
    },
    experimental: {
        scrollRestoration: true,
    },
};

module.exports = withContentlayer(nextConfig);
