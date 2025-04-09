import BackButton from '../../components/backButton'
import Link from 'next/link'
import { Metadata } from 'next'
import { faviconEmoji } from 'lib/emoji'
import { formatDate } from '../../lib/date'

export const metadata: Metadata = {
  title: 'Talks',
  description: "A list of recent public talks I've given",
  icons: faviconEmoji('👄'),
}

type Talk = {
  title: string
  url: string
  host: string
  location?: string
  date: string
}

export default async function Talks() {
  const talks: Talk[] = await import('./talks.json').then((m) => m.default)
  const sortedTalks = talks.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return (
    <>
      <BackButton />
      <ul className="space-y-6 list-none pl-0 pt-3">
        {sortedTalks.map((talk, i) => (
          <li key={i}>
            <Link
              as={talk.url}
              href={talk.url}
              className="no-underline"
              passHref
            >
              <h2 className="text-lg">{talk.title}</h2>
              <div className="text-sm">
                <div className="text-gray dark:text-light-gray">
                  <div>{formatDate(talk.date)}</div>
                  <div>{talk.host}</div>
                  <div>{talk.location}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
