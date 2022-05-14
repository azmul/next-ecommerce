/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  productionBrowserSourceMaps: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    maximumFileSizeToCacheInBytes: 5000000,
  },
}

module.exports = nextConfig

