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
    <figure className="w-full lg:w-4/5 h-auto mx-auto text-center pb">
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
        <figcaption className="pt-1 mx-auto w-4/5 text-gray dark:text-light-gray text-xs text-center">
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
