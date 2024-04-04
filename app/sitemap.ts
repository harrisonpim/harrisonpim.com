import { MetadataRoute } from 'next'
import globby from 'globby'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = {
    production: 'https://harrisonpim.com',
    preview: `https://${process.env.VERCEL_URL}`,
    development: 'http://localhost:3000',
  }[process.env.VERCEL_ENV || 'production']

  const pages = await globby(['app/**/page.{html,js,ts,jsx,tsx,mdx}'])

  const urls = pages.map((page) => {
    const path = page
      .replace('app', '')
      .replace('.tsx', '')
      .replace('.jsx', '')
      .replace('.ts', '')
      .replace('.js', '')
      .replace('.html', '')
      .replace('.mdx', '')
      .replace('/index', '')
      .replace('/404', '')
      .replace('/page', '')
      .replace('/(posts)', '')
    return baseUrl + path
  })

  const uniqueUrls = urls.filter((x, i, a) => a.indexOf(x) === i)

  return uniqueUrls.map((url) => ({
    url: url,
  }))
}
