import { RichText, RichTextBlock } from 'prismic-reactjs'

import { FC } from 'react'
import { linkResolver } from '../prismic/resolvers'

type Props = {
  slice: {
    primary: {
      image: {
        url: string
        alt: string
      }
      caption?: RichTextBlock[]
    }
  }
}

const ImageWithCaption: FC<Props> = ({ slice }) => {
  const hasCaption = RichText.asText(slice.primary.caption) !== ''
  const caption = hasCaption ? (
    <figcaption className="pt-1 mx-auto w-4/5 text-gray text-xs text-center">
      <RichText render={slice.primary.caption} linkResolver={linkResolver} />
    </figcaption>
  ) : null

  return (
    <figure className="mx-auto w-full lg:w-4/5">
      <img
        className="mx-auto"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
      />
      {caption}
    </figure>
  )
}
export default ImageWithCaption
