import CodeBlock from 'components/codeSnippet'
import ImageWithCaption from 'components/imageWithCaption'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <ImageWithCaption {...props} />,
    pre: (props: any) => <CodeBlock {...props} />,
    ...components,
  }
}
