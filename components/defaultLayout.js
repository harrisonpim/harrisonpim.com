import Favicon from './favicon'

export default function DefaultLayout({
  children,
  wide = false,
  debug = false,
  favicon,
}) {
  const style = [
    `${wide ? '' : 'max-w-measure'}`,
    `${debug ? 'debug' : ''}`,
  ].join(' ')

  return (
    <div>
      <Favicon emoji={favicon || '👋'} />
      <div className={style}>{children}</div>
    </div>
  )
}
