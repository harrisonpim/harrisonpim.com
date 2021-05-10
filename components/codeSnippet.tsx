import { RichText, RichTextBlock } from 'prismic-reactjs'

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
    <pre className="text-xs">
      <code className={language}>{code}</code>
    </pre>
  )
}

export default CodeSnippet
