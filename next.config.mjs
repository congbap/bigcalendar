/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  redirects: async () => [
    {
      source: "/",
      destination: "/calendar-demo",
      permanent: false,
    },
  ],
};

export default nextConfig;
