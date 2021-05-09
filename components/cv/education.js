import Block from './block'
import { RichText } from 'prismic-reactjs'
import { formatYear } from '../date'
import { linkResolver } from '../../prismic/resolvers'

export default function Education({ data }) {
  const renderedEducation = data.data.body.map((school, idx) => (
    <div className="pb-2" key={idx}>
      <div className="text-base inline-block">
        {RichText.asText(school.primary.name)}
      </div>
      <div className="text-base block lg:inline-block lg:float-right">
        {formatYear(school.primary['start-date'])}-
        {formatYear(school.primary['end-date'])}
      </div>
      <div className="text-xs">
        <RichText
          render={school.primary.qualifications}
          linkResolver={linkResolver}
        />
      </div>
    </div>
  ))
  return <Block heading="Education" data={renderedEducation} />
}
