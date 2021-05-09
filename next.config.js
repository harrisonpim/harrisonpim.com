module.exports = {
  images: {
    domains: ['images.prismic.io'],
  },
  webpack: (config) => {
    require('./scripts/generate-sitemap')
    return config
  },
}
