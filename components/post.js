import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatDate } from '../components/date'
import { linkResolver } from '../prismic/resolvers'

export default function Post({ post }) {
  const title = RichText.asText(post.data.title)
  const date = formatDate(post.data.date)
  const standfirst = RichText.asText(post.data.standfirst)

  return (
    <div className="py-4" key={title}>
      <Link as={linkResolver(post)} href={linkResolver(post)} passHref>
        <a className="no-underline pb-none">{title}</a>
      </Link>
      <div className="text-xs">
        <div className="text-gray">{date}</div>
        <div>{standfirst}</div>
      </div>
    </div>
  )
}
