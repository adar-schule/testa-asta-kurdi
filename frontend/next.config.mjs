/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        if (process.env.NODE_ENV !== 'production') {
            // Only necessary for local development where frontend and backend are running separately
            return [
                {
                    source: '/api/:path*',
                    destination: `http://localhost:5001/:path*`, // Proxy to the backend in local development
                },
            ];
        }

        // No need for rewrites in production since both FE and BE run on the same port
        return [];
    },
};

export default nextConfig;