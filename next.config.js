/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.dummyapi.io', 'randomuser.me', 'imgur.com']
  }
}

module.exports = nextConfig
