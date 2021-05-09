export default function Block({ heading, data }) {
  return (
    <div className="py-2 flow-root">
      <h2 className="block float-left w-full lg:w-1/6 text-base lg:pr-3">
        {heading}
      </h2>
      <div className="block float-left lg:float-right w-full lg:w-5/6 pt-2 lg:pt-0">
        {data}
      </div>
    </div>
  )
}
