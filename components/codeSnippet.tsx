'use client'

import hljs from 'highlight.js'

export default function CodeBlock(props: {
  children: {
    props: {
      children: string
      className?: string
    }
  }
}) {
  const data = props.children.props
  const code = data.children
  const language = data.className?.replace('language-', '') || 'plaintext'
  const highlightedCode = hljs.highlight(code, { language }).value
  return (
    <div className="pt-3">
      <div className="group relative rounded bg-code-background p-1">
        <div className="invisible group-hover:visible">
          <div className="absolute top-0 right-0 pr-2 pt-1">
            <button
              title="Copy this code block"
              onClick={() => navigator.clipboard.writeText(code)}
            >
              📋
            </button>
          </div>
        </div>
        <pre className="text-code-text overflow-x-scroll py-1 pl-2 text-xs font-roboto-mono">
          <code
            className={`${data.className} `}
            dangerouslySetInnerHTML={{
              __html: highlightedCode,
            }}
          />
        </pre>
      </div>
    </div>
  )
}
