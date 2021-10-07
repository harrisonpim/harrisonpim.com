const fs = require('fs')
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  const HTMLcontent = fs.readFileSync('.next/server/pages/cv.html', 'utf8')
  const CSSpath = '.next/static/css/'
  const CSSfiles = fs.readdirSync(CSSpath).filter((fn) => fn.endsWith('.css'))
  const CSScontent = fs.readFileSync(CSSpath + CSSfiles[0], 'utf8')

  await page.setContent(HTMLcontent)
  await page.addStyleTag({ content: CSScontent })

  await page.pdf({
    path: 'public/cv.pdf',
    format: 'A4',
    scale: 0.67,
    margin: {
      top: '10mm',
      left: '10mm',
      right: '10mm',
      bottom: '10mm',
    },
  })
  await browser.close()
})()
