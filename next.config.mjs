// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
