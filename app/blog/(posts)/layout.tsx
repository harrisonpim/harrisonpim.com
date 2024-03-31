import '../../../styles/app.css'
import '../../../styles/highlight.css'

import BackButton from 'components/backButton'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div>
        <BackButton href="/blog" text="back to the blog" />
        <article className="pt-4 prose">{children}</article>
      </div>
    </>
  )
}
