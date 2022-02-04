/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_HOST: process.env.API_HOST,
    APPLICATION: process.env.APPLICATION,
    PUBLIC_URL: process.env.PUBLIC_URL,
    SITE_URL: process.env.SITE_URL,
    ENVIROMENT: process.env.ENVIROMENT
  },
  images: {
    domains: ['res.cloudinary.com']
  },
}

module.exports = nextConfig

