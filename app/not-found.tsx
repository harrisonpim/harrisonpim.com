import BackButton from '../components/backButton'
import { Metadata } from 'next'
import { faviconEmoji } from 'lib/emoji'

export const metadata: Metadata = {
  title: '404',
  description: 'Page not found',
  icons: faviconEmoji('😬'),
}

export default function NotFound() {
  return (
    <>
      <BackButton />
      <div className="py-4">
        <h1>😬 404 - Page Not Found</h1>
      </div>
    </>
  )
}
