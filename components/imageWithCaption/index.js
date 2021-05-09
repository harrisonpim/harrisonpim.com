import Caption from './caption'

export default function ImageWithCaption({ slice }) {
  return (
    <figure className="mx-auto w-full lg:w-4/5">
      <img
        className="mx-auto"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
      />
      <Caption caption={slice.primary.caption} />
    </figure>
  )
}
