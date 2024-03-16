import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const localPages = await globby([
    'pages/*.{html,js,ts,jsx,tsx}',
    '!pages/_*.{html,js,ts,jsx,tsx}',
    '!pages/**/*[uid].{html,js,ts,jsx,tsx}',
    '!pages/api',
  ])

  const rootPages = (
    await queryRepeatableDocuments((doc) => doc.type === 'page')
  ).map((doc) => `/${doc.uid}`)

  const blogPages = (
    await queryRepeatableDocuments((doc) => doc.type === 'blog-post')
  ).map((doc) => `/blog/${doc.uid}`)

  const pages = [...localPages, ...rootPages, ...blogPages]
  const urls = pages.map((page) => {
    const path = page
      .replace('pages', '')
      .replace('.tsx', '')
      .replace('.jsx', '')
      .replace('.ts', '')
      .replace('.js', '')
      .replace('.html', '')
      .replace('/index', '')
      .replace('/404', '')
    return baseUrl + path
  })

  const uniqueUrls = urls.filter((x, i, a) => a.indexOf(x) === i)

  return uniqueUrls.map((url) => ({
    url: url,
  }))
}
