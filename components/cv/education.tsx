import { RichText, RichTextBlock } from 'prismic-reactjs'

import Block from './block'
import { FC } from 'react'
import { formatYear } from '../date'
import { linkResolver } from '../../prismic/resolvers'

type School = {
  primary: {
    name: RichTextBlock[]
    qualifications: RichTextBlock[]
    'start-date': string
    'end-date': string
  }
}

type Props = {
  data: {
    data: {
      body: School[]
    }
  }
}

const Education: FC<Props> = ({ data }) => {
  const renderedEducation = data.data.body.map((school, idx) => {
    return (
      <div className="pb-2" key={idx}>
        <h3 className="inline-block text-base">
          {RichText.asText(school.primary.name)}
        </h3>
        <div className="block text-sm lg:float-right lg:inline-block lg:text-base">
          {formatYear(school.primary['start-date'])}-
          {formatYear(school.primary['end-date'])}
        </div>
        <div className="text-sm">
          <RichText
            render={school.primary.qualifications}
            linkResolver={linkResolver}
          />
        </div>
      </div>
    )
  })
  return <Block heading="Education" data={renderedEducation} />
}

export default Education
