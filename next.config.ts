import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/blog',
  // Bare vercel.app root has no route under basePath; send it to the blog.
  // On abhishekprashant.dev "/" never reaches this app (the portfolio serves it).
  async redirects() {
    return [
      { source: "/", destination: "/blog", basePath: false, permanent: false },
    ];
  },
};

export default nextConfig;
