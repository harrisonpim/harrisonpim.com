import BackButton from 'components/backButton'
import Link from 'next/link'
import { Metadata } from 'next'
import { faviconEmoji } from 'lib/emoji'
import { formatDate } from 'lib/date'
import { readdir } from 'fs/promises'

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  favicon: string
  content: string
}

export const metadata: Metadata = {
  title: 'Blog',
  description: "Answers which I couldn't find anywhere else",
  icons: faviconEmoji('✏️'),
}

const postsDirectory = 'app/blog/(posts)'

export default async function Blog() {
  const slugs = (await readdir(postsDirectory, { withFileTypes: true })).filter(
    (dirent) => dirent.isDirectory(),
  )

  // Retreive posts, with their metadata
  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const post = await import(`${postsDirectory}/${name}/page.mdx`)
      const metadata = post.metadata
      return { slug: name, ...metadata }
    }),
  )

  // Sort posts by date
  posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="prose">
      <BackButton />
      <ul className="space-y-6 list-none pl-0">
        {posts.map((post) => (
          <li key={post.title}>
            <Link
              as={`blog/${post.slug}`}
              href={`blog/${post.slug}`}
              className="no-underline"
              passHref
            >
              <h2 className="text-lg">{post.title}</h2>
              <div className="text-sm text-gray dark:text-light-gray">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <p>{post.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
