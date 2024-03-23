const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['images.prismic.io', 'harrisonpim.cdn.prismic.io'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/cv.pdf',
        destination: '/api/cv.pdf',
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
