import { RichText, RichTextBlock } from 'prismic-reactjs'

import Block from './block'
import { FC } from 'react'
import { formatYear } from '../date'
import { linkResolver } from '../../prismic/resolvers'

type Job = {
  primary: {
    title: RichTextBlock[]
    employer: RichTextBlock[]
    responsibilities: RichTextBlock[]
    'start-date': string
    'end-date': string
  }
}

type Props = {
  data: {
    data: {
      body: Job[]
    }
  }
}

const Jobs: FC<Props> = ({ data }) => {
  const renderedJobs = (
    <ul className="list-none space-y-3 pl-0">
      {data.data.body.map((job, idx) => (
        <li key={idx}>
          <h3 className="inline-block">
            {RichText.asText(job.primary.title)},{' '}
            {RichText.asText(job.primary.employer)}
          </h3>
          <p className="block lg:float-right lg:inline-block">
            {formatYear(job.primary['start-date'])}-
            {formatYear(job.primary['end-date'])}
          </p>
          <div className="text-sm">
            <RichText
              render={job.primary.responsibilities}
              linkResolver={linkResolver}
            />
          </div>
        </li>
      ))}
    </ul>
  )
  return <Block heading="Experience" data={renderedJobs} />
}

export default Jobs
