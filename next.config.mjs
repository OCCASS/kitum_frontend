import withBundleAnalyzer from "@next/bundle-analyzer";
import withMdx from "@next/mdx";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const mdx = withMdx();

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "192.168.0.158",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "api.kitum.net",
        pathname: "/media/**",
      },
    ],
  },
};

export default mdx(bundleAnalyzer(nextConfig));
