import { RichText, RichTextBlock } from 'prismic-reactjs'

import Block from './block'
import { FC } from 'react'
import { linkResolver } from 'prismic/resolvers'

type Tool = {
  primary: {
    category: RichTextBlock[]
    set: RichTextBlock[]
  }
}

type Props = {
  data: {
    data: {
      body: Tool[]
    }
  }
}

const Tools: FC<Props> = ({ data }) => {
  const renderedTools = data.data.body.map((tool, idx) => (
    <div key={idx}>
      <h3>{RichText.asText(tool.primary.category)}</h3>
      <div className="text-sm">
        <RichText render={tool.primary.set} linkResolver={linkResolver} />
      </div>
    </div>
  ))

  return <Block heading="Skills + Tools" data={renderedTools} />
}

export default Tools
