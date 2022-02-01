import { RichText, RichTextBlock } from 'prismic-reactjs'

import Block from './block'
import { FC } from 'react'
import { linkResolver } from '../../prismic/resolvers'

type Thing = {
  primary: {
    title: RichTextBlock[]
    description: RichTextBlock[]
  }
}

type Props = {
  data: {
    data: {
      body: Thing[]
    }
  }
}

const Other: FC<Props> = ({ data }) => {
  const renderedOther = data.data.body.map((thing, idx) => (
    <div className="pb-2" key={idx}>
      <h3>{RichText.asText(thing.primary.title)}</h3>
      <div className="text-sm">
        <RichText
          render={thing.primary.description}
          linkResolver={linkResolver}
        />
      </div>
    </div>
  ))

  return <Block heading="Other Stuff" data={renderedOther} />
}

export default Other
