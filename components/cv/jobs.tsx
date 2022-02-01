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
      <h3 className="inline-block">
        {RichText.asText(job.primary.title)},{' '}
        {RichText.asText(job.primary.employer)}
      </h3>
      <div className="block text-sm lg:float-right lg:inline-block lg:text-base">
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
  return <Block heading="Experience" data={renderedJobs} />
}

export default Jobs
