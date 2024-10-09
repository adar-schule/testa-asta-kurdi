/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/api/:path*',
                    destination: `http://localhost:5001/:path*`,  // Proxy to the backend for local development
                },
            ];
        }
        return [];
    },
};

export default nextConfig;