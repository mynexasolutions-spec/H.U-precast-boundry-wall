/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Allowed image qualities: 75 = normal, 95 = hero banners (kept sharp, not over-compressed)
  images: { qualities: [75, 95] },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
