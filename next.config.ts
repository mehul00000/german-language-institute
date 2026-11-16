import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local photography is optimised in place; remote sources are not used.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
