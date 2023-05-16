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
  const renderedEducation = (
    <ul className="list-none space-y-3 pl-0">
      {data.data.body.map((school, idx) => {
        return (
          <li key={idx}>
            <h3 className="inline-block">
              {RichText.asText(school.primary.name)}
            </h3>
            <p className="block lg:float-right print:float-right print:inline-block lg:inline-block">
              {formatYear(school.primary['start-date'])}-
              {formatYear(school.primary['end-date'])}
            </p>
            <div className="text-sm">
              <RichText
                render={school.primary.qualifications}
                linkResolver={linkResolver}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )

  return <Block heading="Education" data={renderedEducation} />
}

export default Education
