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
    <figure className="mx-auto h-auto w-full py-3 text-center lg:w-4/5">
      <Image
        className="rounded-sm"
        layout="responsive"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        height={slice.primary.image.dimensions.height}
        width={slice.primary.image.dimensions.width}
        quality={100}
      />
      <figcaption className="mx-auto w-4/5 text-center text-sm text-gray dark:text-light-gray">
        <RichText render={slice.primary.caption} linkResolver={linkResolver} />
      </figcaption>
    </figure>
  )
}
export default ImageWithCaption
