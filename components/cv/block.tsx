import { FC } from 'react'

type Props = {
  heading: string
  data: unknown
}

const Block: FC<Props> = ({ heading, data }) => {
  return (
    <section className="flow-root">
      <h2 className="float-left w-full text-lg lg:w-1/6 lg:pr-3 lg:text-base lg:font-medium print:w-1/6 print:pr-3 print:text-base print:font-medium">
        {heading}
      </h2>
      <div className="float-left w-full space-y-3 pt-1 lg:float-right lg:w-5/6 lg:pt-0 print:float-right print:w-5/6 print:pt-0">
        {data}
      </div>
    </section>
  )
}

export default Block
