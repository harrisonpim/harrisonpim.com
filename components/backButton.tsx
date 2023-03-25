import { FC } from 'react'

type Props = {
  href?: string
  text?: string
}

const BackButton: FC<Props> = ({ href = '/', text = 'back home' }) => (
  <a className="text-gray no-underline dark:text-light-gray font-space-grotesk" href={href}>
    ← {text}
  </a>
)

export default BackButton
