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
        ],
    },
    eslint: {
	    ignoreDuringBuilds: true
    },
    typescript: {
	    ignoreBuildErrors: true
    }
};

//export
export default nextConfig;
