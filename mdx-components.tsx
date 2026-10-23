import CodeBlock from 'components/codeSnippet'
import ImageWithCaption from 'components/imageWithCaption'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <ImageWithCaption {...props} />,
    pre: (props: any) => <CodeBlock {...props} />,
    p: ({ children }) => {
      // Check whether the text looks like a date
      const text = children?.toString() || ''
      const isDate = /^\w{3} \d{4}.*/.test(text) || /^\d{4}.*/.test(text)

      if (isDate) {
        return (
          <p className="text-sm text-gray break-after-avoid dark:text-light-gray">
            {children}
          </p>
        )
      }

      return <p className="text-base leading-relaxed print:leading-normal">{children}</p>
    },
    ...components,
  }
}
