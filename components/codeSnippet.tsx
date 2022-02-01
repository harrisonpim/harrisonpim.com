import { RichText, RichTextBlock } from 'prismic-reactjs'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FC } from 'react'

type Props = {
  slice: {
    primary: {
      code: RichTextBlock[]
      language: {
        text?: string
      }
    }
  }
}

const CodeSnippet: FC<Props> = ({ slice }) => {
  const code = RichText.asText(slice.primary.code).trim()
  const hasLanguage = slice.primary.language[0]
  const language = hasLanguage ? `${hasLanguage.text}` : 'plaintext'
  return (
    <div className="pt-3">
      <div className="group relative rounded bg-code-background p-1">
        <div className="invisible group-hover:visible">
          <div className="absolute top-0 right-0 pr-2 pt-1">
            <CopyToClipboard text={code}>
              <button title="Copy this code block">📋</button>
            </CopyToClipboard>
          </div>
        </div>
        <pre className="overflow-x-scroll py-1 pl-2 text-xs text-white">
          <code className={language}>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeSnippet
