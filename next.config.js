/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // ...
    },
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
}
 
module.exports = nextConfig
