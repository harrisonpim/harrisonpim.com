import CodeSnippet from './codeSnippet'
import ImageWithCaption from './imageWithCaption'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic/resolvers'

export default function SliceZone({ sliceZone }) {
  const slices = sliceZone.map((slice, idx) => {
    switch (slice.slice_type) {
      case 'text':
        return (
          <RichText
            render={slice.primary.text}
            linkResolver={linkResolver}
            key={idx}
          />
        )
      case 'image_with_caption':
        return <ImageWithCaption slice={slice} key={idx} />
      case 'code_snippet':
        return <CodeSnippet slice={slice} key={idx} />
      default:
        return null
    }
  })

  return <div className="prose">{slices}</div>
}
