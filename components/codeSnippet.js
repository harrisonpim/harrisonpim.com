import { RichText } from 'prismic-reactjs'

export default function CodeSnippet({ slice }) {
  const code = RichText.asText(slice.primary.code).trim()
  const hasLanguage = slice.primary.language[0]
  const language = hasLanguage ? `${hasLanguage.text}` : 'plaintext'
  return (
    <pre>
      <code className={language}>{code}</code>
    </pre>
  )
}
