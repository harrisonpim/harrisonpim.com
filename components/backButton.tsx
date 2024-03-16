import { FC } from 'react'
import Link from 'next/link'

type Props = {
  href?: string
  text?: string
}

const BackButton: FC<Props> = ({ href = '/', text = 'back home' }) => (
  <Link
    className="text-gray no-underline dark:text-light-gray font-space-grotesk"
    href={href}
  >
    ← {text}
  </Link>
)

export default BackButton
