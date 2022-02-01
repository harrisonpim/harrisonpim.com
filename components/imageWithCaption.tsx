import { RichText, RichTextBlock } from 'prismic-reactjs'

import { FC } from 'react'
import Image from 'next/image'
import { linkResolver } from '../prismic/resolvers'

type Props = {
  slice: {
    primary: {
      image: {
        url: string
        alt: string
        dimensions: {
          width: number
          height: number
        }
      }
      caption?: RichTextBlock[]
    }
  }
}

const ImageWithCaption: FC<Props> = ({ slice }) => {
  return (
    <figure className="pb mx-auto h-auto w-full text-center lg:w-4/5">
      <Image
        className="rounded-sm"
        layout="responsive"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        height={slice.primary.image.dimensions.height}
        width={slice.primary.image.dimensions.width}
        quality={100}
      />
      {RichText.asText(slice.primary.caption) ? (
        <figcaption className="mx-auto w-4/5 pt-1 text-center text-xs text-gray dark:text-light-gray">
          <RichText
            render={slice.primary.caption}
            linkResolver={linkResolver}
          />
        </figcaption>
      ) : null}
    </figure>
  )
}
export default ImageWithCaption
