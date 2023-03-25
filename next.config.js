module.exports = {
  images: {
    domains: ['images.prismic.io', 'harrisonpim.cdn.prismic.io'],
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
