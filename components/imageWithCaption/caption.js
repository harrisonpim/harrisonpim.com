import { RichText } from 'prismic-reactjs'
import { customLink } from '../../prismic/helpers'
import { linkResolver } from '../../prismic/resolvers'

export default function Caption({ caption }) {
  if (RichText.asText(caption) !== '') {
    return (
      <figcaption className="pt-1 mx-auto w-4/5 text-gray text-xs text-center">
        <RichText
          render={caption}
          linkResolver={linkResolver}
          serializeHyperlink={customLink}
        />
      </figcaption>
    )
  }

  return null
}
