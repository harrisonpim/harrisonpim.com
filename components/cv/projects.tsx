import { RichText, RichTextBlock } from 'prismic-reactjs'

import Block from './block'
import { FC } from 'react'
import { formatYear } from 'components/date'
import { linkResolver } from '../../prismic/resolvers'

type Project = {
  primary: {
    title: RichTextBlock[]
    description: RichTextBlock[]
    date: string
  }
}

type Props = {
  data: {
    data: {
      body: Project[]
    }
  }
}

const Projects: FC<Props> = ({ data }) => {
  const renderedProjects = data.data.body.map((project, idx) => (
    <div className="pb-2" key={idx}>
      <div>
        {RichText.asText(project.primary.title)},{' '}
        {formatYear(project.primary.date)}
      </div>
      <div className="text-sm">
        <RichText
          render={project.primary.description}
          linkResolver={linkResolver}
        />
      </div>
    </div>
  ))

  return <Block heading="Projects" data={renderedProjects} />
}

export default Projects
