import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    devIndicators: false,
    async redirects() {
        return [
            {
                source: '/posts/:path',
                destination: '/post/:path',
                permanent: true,
            },
            {
                source: '/index',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
