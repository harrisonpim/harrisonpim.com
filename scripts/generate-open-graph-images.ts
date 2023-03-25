import fs from 'fs'
import prismic from '@prismicio/client'
import puppeteer from 'puppeteer'
require('dotenv').config()

const client = prismic.client(
  `https://${process.env.PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2`,
  { accessToken: process.env.PRISMIC_ACCESS_TOKEN }
)

function openGraphImage(title, emoji) {
  const imageURL = emoji
    ? `https://emojicdn.elk.sh/${emoji}`
    : 'https://github.com/harrisonpim.png'

  const imageClass = emoji ? '' : 'rounded-full shadow-xl'
  return `
<!doctype html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charSet="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        "nice-gray": '#343434',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-nice-gray">
    <div class="h-screen w-screen flex flex-row justify-center items-center p-10 gap-10">
        <div class="w-1/3 relative">
            <img class="h-auto w-full items-center float-right ${imageClass}" src="${imageURL}" />
        </div>
        <div class="w-2/3">
            <h1 class="text-6xl text-white uppercase">${title}</h1>
        </div>
    </div>
</body>
</html>
  `
}

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

;(async () => {
  const blogPages = await queryRepeatableDocuments(
    (doc) => doc.type === 'blog-post'
  )

  // if the folder doesn't exist, create it
  if (!fs.existsSync('public/open-graph-images')) {
    fs.mkdirSync('public/open-graph-images')
  }

  const layouts = blogPages.map((page) => {
    const title = page.data.title[0].text
    const emoji = page.data.favicon[0] ? page.data.favicon[0].text : null
    return openGraphImage(title, emoji)
  })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })

  // generate the images
  for (let i = 0; i < layouts.length; i++) {
    const HTMLcontent = layouts[i]
    await page.setContent(HTMLcontent, { waitUntil: 'networkidle0' })
    await page.evaluateHandle('document.fonts.ready')

    await page.screenshot({
      path: `public/open-graph-images/${blogPages[i].uid}.png`,
      fullPage: true,
    })

    console.log(`🖼️   Generated open graph image for ${blogPages[i].uid}`)
  }
  await page.close()

  await browser.close()
})()
