import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                port: '',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'neuewebsite.rheingold-salon.de',
                pathname: '/static/images/**',
                port: '',
                search: '',
            }
        ],
    },
};

//export
export default nextConfig;
