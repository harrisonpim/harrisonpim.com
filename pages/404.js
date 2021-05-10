import BackButton from '../components/backButton'
import Layout from '../components/defaultLayout'

export default function Custom404() {
  return (
    <Layout favicon="😬">
      <BackButton />
      <h1>404 - Page Not Found</h1>
    </Layout>
  )
}
