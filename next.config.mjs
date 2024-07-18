import withBundleAnalyzer from "@next/bundle-analyzer"
import withMdx from "@next/mdx"


const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

const mdx = withMdx()

/** @type {import('next').NextConfig} */

const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
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
            },
            {
                protocol: "https",
                hostname: "dropify.ru",
                pathname: "/media/**"
            },
            {
                protocol: "https",
                hostname: "kitumapi.serveo.net",
                pathname: "/media/**"
            },
            {
                protocol: "http",
                hostname: "kitumapi.serveo.net",
                pathname: "/media/**"
            }
        ]
    }
}

export default mdx(bundleAnalyzer(nextConfig));
