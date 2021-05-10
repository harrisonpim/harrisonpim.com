import { FC, ReactNode } from 'react'

import Favicon from './favicon'

type Props = {
  children?: ReactNode
  wide?: boolean
  debug?: boolean
  favicon?: string
}

const Layout: FC<Props> = ({
  children,
  wide = false,
  debug = false,
  favicon = '👋',
}) => (
  <div>
    <Favicon emoji={favicon} />
    <div className={`${wide ? '' : 'max-w-measure'} ${debug ? 'debug' : ''}`}>
      {children}
    </div>
  </div>
)

export default Layout
