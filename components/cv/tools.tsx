import { RichText, RichTextBlock } from 'prismic-reactjs'

import Block from './block'
import { FC } from 'react'

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
    <div className="pb-2" key={idx}>
      <div>{RichText.asText(tool.primary.category)}</div>
      <div className="text-sm">{RichText.asText(tool.primary.set)}</div>
    </div>
  ))

  return <Block heading="Skills & Tools" data={renderedTools} />
}

export default Tools
