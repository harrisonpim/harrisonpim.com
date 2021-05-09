import Block from './block'
import { RichText } from 'prismic-reactjs'
import { formatYear } from '../date'
import { linkResolver } from '../../prismic/resolvers'

export default function Projects({ data }) {
  const renderedProjects = data.data.body.map((project, idx) => (
    <div className="pb-2" key={idx}>
      <div className="text-base">
        {RichText.asText(project.primary.title)},{' '}
        {formatYear(project.primary.date)}
      </div>
      <div className="text-xs">
        <RichText
          render={project.primary.description}
          linkResolver={linkResolver}
        />
      </div>
    </div>
  ))

  return <Block heading="Recent Projects" data={renderedProjects} />
}
