// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },

  output: "standalone",
  logging: {
    info: console.info,
    warn: console.warn,
    error: console.error,
  },

  // rewrites: async () => [
  //   {
  //     source: "/api/proxy/:path*",
  //     destination: "http://localhost:5000/api/:path*",
  //   },
  // ],
};

export default nextConfig;
