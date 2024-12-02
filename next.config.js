const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    trailingSlash: true,
    experimental: {

        serverActions: true,
        serverActionsBodySizeLimit: '2mb',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                "undici": false,
            };
        }
        return config;
    },
}

module.exports = nextConfig

