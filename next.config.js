module.exports = {
  images: {
    domains: ['images.prismic.io', 'harrisonpim.cdn.prismic.io'],
  },
  async redirects() {
    return [
      {
        source: '/blog/favicon-emoji-magic',
        destination: '/blog/using-emoji-as-favicons',
        permanent: true,
      },
    ]
  },
}
