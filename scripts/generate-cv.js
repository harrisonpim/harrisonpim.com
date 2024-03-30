const fs = require('fs')
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
    ],
  })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/cv', { waitUntil: 'networkidle2' })
  await page.pdf({
    path: 'public/cv.pdf',
    format: 'A4',
  })
  await browser.close()
})()
