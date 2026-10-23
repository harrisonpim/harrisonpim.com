import { FC } from 'react'

type CVBlockProps = {
  heading: string
  children: React.ReactNode
}

const CVBlock: FC<CVBlockProps> = ({ heading, children }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-x-0 lg:gap-x-6 gap-y-1 lg:gap-y-0 items-start print:grid-cols-5 print:gap-x-6 print:gap-y-0 ">
      <h2 className="text-base font-semibold lg:col-span-1 print:col-span-1">
        {heading}
      </h2>
      <div className="lg:col-span-4 print:col-span-4 [&>h3]:mt-4 [&>h3:first-child]:mt-0 [&>h3]:break-after-avoid [&>p]:mt-1 [&>p]:break-inside-avoid [&>ul]:mt-1 [&_li]:break-inside-avoid">
        {children}
      </div>
    </section>
  )
}

export default CVBlock
