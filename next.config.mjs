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
            {
                source: '/index',
                destination: '/',
                permanent: true,
            },
        ];
    },
    experimental: {
        scrollRestoration: true,
    },
    env: {
        PER_PAGE: '5',
        TEMP_DIR: '.temp',
    },
};

export default nextConfig;
