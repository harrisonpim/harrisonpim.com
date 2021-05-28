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
    <div className="px-1 bg-code-background rounded relative">
      <div className="pr-2 pt-1 absolute top-0 right-0">
        <CopyToClipboard text={code}>
          <button title="Copy this code block">📋</button>
        </CopyToClipboard>
      </div>
      <pre className="text-xs">
        <code className={language}>{code}</code>
      </pre>
    </div>
  )
}

export default CodeSnippet
