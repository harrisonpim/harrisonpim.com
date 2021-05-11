import BackButton from '../../components/backButton'
import { Client } from '../../prismic/helpers'
import { GetStaticProps } from 'next'
import Layout from '../../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatDate } from '../../components/date'
import { linkResolver } from '../../prismic/resolvers'
import { queryRepeatableDocuments } from '../../prismic/queries'

const Blog = ({ blog, posts }) => {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return (
    <Layout
      title={RichText.asText(blog.data.title)}
      description={RichText.asText(blog.data.description)}
      favicon={RichText.asText(blog.data.favicon)}
    >
      <BackButton />
      <div>
        {sortedPosts.map((post) => (
          <div className="py-4" key={RichText.asText(post.data.title)}>
            <Link as={linkResolver(post)} href={linkResolver(post)}>
              <a className="no-underline pb-none leading-snug">
                <h3>{RichText.asText(post.data.title)}</h3>
              </a>
            </Link>
            <div className="text-gray">{formatDate(post.data.date)}</div>
            <div>{RichText.asText(post.data.standfirst)}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blog = await Client().getByUID('page', 'blog', {})
  const posts = await queryRepeatableDocuments(
    (doc) => doc.type === 'blog-post'
  )

  return {
    props: {
      blog,
      posts: posts,
    },
  }
}

export default Blog
