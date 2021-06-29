import { FC } from 'react'

type Props = {
  heading: string
  data: unknown
}

const Block: FC<Props> = ({ heading, data }) => {
  return (
    <div className="flow-root">
      <h2 className="block float-left w-full lg:w-1/6 lg:pr-3 text-lg lg:text-base">
        {heading}
      </h2>
      <div className="block float-left lg:float-right w-full lg:w-5/6 pt-1 lg:pt-0">
        {data}
      </div>
    </div>
  )
}

export default Block
