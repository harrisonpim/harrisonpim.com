import '../../../styles/app.css'
import '../../../styles/highlight.css'

import BackButton from 'components/backButton'
import { formatDate } from 'lib/date'
import { headers } from 'next/headers'

const postsDirectory = 'app/blog/(posts)'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const slug = headers().get('x-next-blog-post-slug') as string
  const post = await import(`${postsDirectory}/${slug}/page.mdx`)
  const metadata = post.metadata

  return (
    <>
      <div>
        <BackButton href="/blog" text="back to the blog" />
        <article className="pt-4 prose">
          <h1 className="text-4xl font-bold">{metadata.title}</h1>
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
          {children}
        </article>
      </div>
    </>
  )
}
