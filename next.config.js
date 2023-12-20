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
    env: { PER_PAGE: '6' },
};

module.exports = nextConfig;
