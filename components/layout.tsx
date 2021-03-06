import { FC, ReactNode } from 'react'

import Head from 'next/head'

type Props = {
  children?: ReactNode
  wide?: boolean
  debug?: boolean
  favicon?: string
  title: string
  description: string
}

const Layout: FC<Props> = ({
  children,
  title,
  description,
  wide = false,
  debug = false,
  favicon,
}) => {
  const emojiSvg = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${
    favicon && favicon !== '' ? favicon : '👋'
  }</text></svg>`
  return (
    <div>
      <Head>
        <link rel="icon" href={emojiSvg} />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div
        className={`${wide ? '' : 'max-w-measure'} ${
          debug ? 'debug' : ''
        } antialiased`}
      >
        {children}
      </div>
    </div>
  )
}
export default Layout
