import { formatMonth, timeInOrganisation } from 'lib/date'

import { FC } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { faviconEmoji } from 'lib/emoji'

type BlockProps = {
  heading: string
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Harrison Pim',
  description:
    "I'm a data scientist / machine learning engineer with a background in computational / quantum physics.",
  icons: faviconEmoji('📄'),
}

const Block: FC<BlockProps> = ({ heading, children }) => {
  return (
    <section className="flow-root">
      <h2 className="float-left w-full text-lg lg:w-1/6 lg:pr-3 lg:font-medium print:w-1/6 print:pr-3 print:font-medium pt-1">
        {heading}
      </h2>
      <div className="float-left w-full space-y-3 pt-1 lg:float-right lg:w-5/6 lg:pt-0 print:float-right print:w-5/6 print:pt-0">
        {children}
      </div>
    </section>
  )
}

export default async function CV() {
  const cv = await import('./cv.json').then((m) => m.default)
  return (
    <div className="space-y-3">
      <Link href="/" className="no-underline">
        <h1 className="text-3xl leading-tight">Harrison Pim</h1>
      </Link>
      <div className="text-sm space-y-1">
        {cv.description.split('\n').map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
      <Block heading="Experience">
        <ul className="list-none space-y-2 pl-0">
          {cv.experience.map((job, idx) => (
            <li key={idx}>
              <h3 className="pt-1 text-lg">
                {job.url ? (
                  <a href={job.url} className="no-underline">
                    {job.organisation}
                  </a>
                ) : (
                  job.organisation
                )}
                {'  ·  '}
                <span className=" font-light">{timeInOrganisation(job)}</span>
              </h3>
              <ul className="list-none pl-0">
                {job.roles.map((role, idx) => (
                  <li key={idx}>
                    <h4 className="text-base pt-0.5">
                      {role.title}
                      {'  ·  '}
                      <span className=" font-light">
                        {formatMonth(role['start-date'])} -{' '}
                        {formatMonth(role['end-date'])}
                      </span>
                    </h4>
                    <p className="text-sm ">{role.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Block>
      <Block heading="Education">
        <ul className="list-none space-y-2 pl-0">
          {cv.education.map((education, idx) => (
            <li key={idx}>
              <h3 className="pt-1 text-lg">{education.institution}</h3>
              <p className="text-base">
                {education.qualification}
                {', '}
                {education.grade}
                {'  ·  '}
                <span className=" font-light">
                  {formatMonth(education['start-date'])} -{' '}
                  {formatMonth(education['end-date'])}
                </span>
              </p>
              <p className="text-sm ">{education.description}</p>
            </li>
          ))}
        </ul>
      </Block>
      <Block heading="Skills + Tools">
        <ul className="list-none space-y-2 pl-0">
          {Object.entries(cv.skills).map(([title, skills], idx) => (
            <li key={idx}>
              <h3 className="pt-1 text-lg">{title}</h3>
              <p className="text-sm">{skills.join(', ')}</p>
            </li>
          ))}
        </ul>
      </Block>
      <Block heading="Other Stuff">
        <ul className="list-none space-y-2 pl-0">
          {Object.entries(cv.other).map(([title, content], idx) => (
            <li key={idx}>
              <h3 className="pt-1 text-lg">{title}</h3>
              <p className="text-sm">{content}</p>
            </li>
          ))}
        </ul>
      </Block>
      <section>
        <a
          href="/cv.pdf"
          className="text-base text-gray no-underline dark:text-light-gray print:hidden"
        >
          Download this as a PDF
        </a>
      </section>
    </div>
  )
}
