import CodeSnippet from './codeSnippet'
import ImageWithCaption from './imageWithCaption'
import { RichText } from 'prismic-reactjs'
import hljs from 'highlight.js'
import { linkResolver } from '../prismic/resolvers'
import python from 'highlight.js/lib/languages/python'
import { useEffect } from 'react'

hljs.registerLanguage('python', python)

export default function SliceZone({ sliceZone }) {
  useEffect(() => {
    hljs.initHighlighting()
  }, [])

  const slices = sliceZone.map((slice, idx) => {
    switch (slice.slice_type) {
      case 'text':
        return (
          <div key={idx}>
            <RichText render={slice.primary.text} linkResolver={linkResolver} />
          </div>
        )
      case 'image_with_caption':
        return (
          <div key={idx}>
            <ImageWithCaption slice={slice} />
          </div>
        )
      case 'code_snippet':
        return (
          <div key={idx}>
            <CodeSnippet slice={slice} />
          </div>
        )
      default:
        return <div key={idx} />
    }
  })

  return <div className="prose">{slices}</div>
}
