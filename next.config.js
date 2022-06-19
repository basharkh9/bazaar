/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    SERVER: process.env.SERVER,
    MONGODB_URI: process.env.MONGODB_URI,
    bazaar_jwtPrivateKey: process.env.bazaar_jwtPrivateKey,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://bazaar-kappa.vercel.app/:path*",
      },
    ];
  },
};
