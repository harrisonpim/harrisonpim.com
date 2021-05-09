import { RichText } from 'prismic-reactjs'
import { customLink } from '../../prismic/helpers'
import { linkResolver } from '../../prismic/resolvers'
import Block from './block'
import { formatYear } from '../date'

export default function Jobs({ data }) {
  const renderedJobs = data.data.body.map((job, idx) => (
    <div className="pb-2" key={idx}>
      <div className="text-base inline-block">
        {RichText.asText(job.primary.title)},{' '}
        {RichText.asText(job.primary.employer)}
      </div>
      <div className="text-base block lg:inline-block lg:float-right">
        {formatYear(job.primary['start-date'])}-
        {formatYear(job.primary['end-date'])}
      </div>
      <div className="text-xs">
        <RichText
          render={job.primary.responsibilities}
          linkResolver={linkResolver}
          serializeHyperlink={customLink}
        />
      </div>
    </div>
  ))
  return <Block heading="Jobs" data={renderedJobs} />
}
