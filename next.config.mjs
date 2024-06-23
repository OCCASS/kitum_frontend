/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/media/**"
            },
            {
                protocol: "http",
                hostname: "192.168.0.158",
                pathname: "/media/**"
            }
        ]
    }
};

export default nextConfig;
