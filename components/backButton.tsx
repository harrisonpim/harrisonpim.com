import { FC } from 'react'

type Props = {
  href?: string
  text?: string
}

const BackButton: FC<Props> = ({ href = '/', text = 'back home' }) => (
  <a className="no-underline text-gray" href={href}>
    ← {text}
  </a>
)

export default BackButton
