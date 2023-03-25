import dotenv from 'dotenv'
import fs from 'fs'
import globby from 'globby'
import prettier from 'prettier'
import prismic from '@prismicio/client'

dotenv.config()

const baseUrl = {
  production: 'https://harrisonpim.com',
  preview: process.env.VERCEL_URL,
  development: 'http://localhost:3000',
}[process.env.VERCEL_ENV]

const client = prismic.client(
  `https://${process.env.PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2`,
  {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  }
)

async function fetchDocs(page = 1, routes = []) {
  const response = await client.query('', { pageSize: 100, lang: '*', page })
  const allRoutes = routes.concat(response.results)
  if (response.results_size + routes.length < response.total_results_size) {
    return fetchDocs(page + 1, allRoutes)
  }
  return allRoutes
}

async function queryRepeatableDocuments(filter) {
  const allRoutes = await fetchDocs()
  return allRoutes.filter(filter)
}

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

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

  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniqueUrls.map((url) => `<url><loc>${url}</loc></url>`).join('')}
  </urlset>`

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formatted)

  console.log('📍  Generated sitemap')
}

generateSitemap()
