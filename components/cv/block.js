export default function Block({ heading, data }) {
  return (
    <div className="py-2">
      <h2 className="block float-left w-full lg:w-1/5">{heading}</h2>
      <div className="block float-left lg:float-right w-full lg:w-4/5">
        {data}
      </div>
    </div>
  );
}
