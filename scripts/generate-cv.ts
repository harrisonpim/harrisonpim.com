import puppeteer from 'puppeteer'
import spawn from 'child_process'

async function generatePDF() {
  const server = spawn.spawn('yarn', ['run', 'next', 'start'])

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
    ],
  })

  const page = await browser.newPage()
  await page.goto('http://localhost:3000/cv')

  // Wait for the page to load
  await page.waitForSelector('body')

  await page.pdf({
    path: 'public/cv.pdf',
    format: 'a4',
    scale: 0.67,
    margin: {
      top: '7mm',
      bottom: '7mm',
      left: '10mm',
      right: '10mm',
    },
  })
  await browser.close()
  server.kill()
  console.log('📝  Generated cv.pdf')
}

generatePDF()
