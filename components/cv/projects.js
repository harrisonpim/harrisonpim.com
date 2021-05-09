import { RichText } from 'prismic-reactjs'
import { formatYear } from '../date'
import Block from './block'

export default function Projects({ data }) {
  const renderedProjects = data.data.body.map((project, idx) => (
    <div className="pb-2" key={idx}>
      <div className="text-base">
        {RichText.asText(project.primary.title)},{' '}
        {formatYear(project.primary.date)}
      </div>
      <div className="text-xs">
        {RichText.asText(project.primary.description)}
      </div>
    </div>
  ))

  return <Block heading="Recent Projects" data={renderedProjects} />
}
