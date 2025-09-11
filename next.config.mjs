import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: path.resolve('./'), // définit le dossier racine du projet
    images: {
        qualities: [100],
        formats: ['image/avif', 'image/webp'],
        // domains: ['example.com'], // for external images
    },
    transpilePackages: ['three'],
};

export default nextConfig;
