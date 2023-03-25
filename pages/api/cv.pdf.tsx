import puppeteer from 'puppeteer'

export default async function handler(req, res) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const root =
    process.env.VERCEL_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${process.env.VERCEL_URL}`

  await page.goto(`${root}/cv`, {
    waitUntil: 'networkidle0',
  })

  const pdf = await page.pdf({
    format: 'a4',
    scale: 0.67,
    margin: {
      top: '7mm',
      bottom: '7mm',
      left: '10mm',
      right: '10mm',
    },
  })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'inline; filename="harrison-pim.pdf"')
  res.send(pdf)
}
