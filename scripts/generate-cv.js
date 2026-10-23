const puppeteer = require('puppeteer')

const url = 'http://localhost:3000/cv'

;(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
    ],
  })
  try {
    const page = await browser.newPage()
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'light' },
    ])
    const response = await page.goto(url, { waitUntil: 'networkidle2' })
    if (!response || !response.ok()) {
      throw new Error(`${url} responded with ${response && response.status()}`)
    }
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({
      path: 'public/cv.pdf',
      format: 'A4',
      preferCSSPageSize: true,
    })
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(`Couldn't generate the CV: ${error.message}`)
  console.error(`Is \`yarn dev\` running, and serving ${url}?`)
  process.exit(1)
})
