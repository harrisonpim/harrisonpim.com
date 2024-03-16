export default function ImageWithCaption(props: {
  src?: string
  alt?: string
  title?: string
}) {
  return (
    <figure className="mx-auto h-auto w-full py-3 text-center lg:w-4/5">
      <img
        {...props}
        // if the page is in dark mode and the image is an svg, it should be inverted
        className={`rounded-sm ${
          props.src?.includes('.svg') ? 'dark:invert' : ''
        }`}
      />
      <figcaption className="mx-auto w-4/5 text-center text-sm text-gray dark:text-light-gray">
        {props.title}
      </figcaption>
    </figure>
  )
}
