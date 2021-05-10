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
  const renderedJobs = data.data.body.map((job, idx) => (
    <div className="pb-2" key={idx}>
      <div className="inline-block">
        {RichText.asText(job.primary.title)},{' '}
        {RichText.asText(job.primary.employer)}
      </div>
      <div className="text-sm lg:text-base block lg:inline-block lg:float-right">
        {formatYear(job.primary['start-date'])}-
        {formatYear(job.primary['end-date'])}
      </div>
      <div className="text-sm">
        <RichText
          render={job.primary.responsibilities}
          linkResolver={linkResolver}
        />
      </div>
    </div>
  ))
  return <Block heading="Jobs" data={renderedJobs} />
}

export default Jobs
