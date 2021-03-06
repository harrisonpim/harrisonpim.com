import BackButton from '../components/backButton'
import Layout from '../components/layout'

export default function Custom404() {
  return (
    <Layout title="404" description="Page not found" favicon="😬">
      <BackButton />
      <div className="py-4">
        <h1>😬 404 - Page Not Found</h1>
      </div>
    </Layout>
  )
}
