export default function Block({ heading, data }) {
  return (
    <div className="py-2">
      <h2 className="block float-left width-full">{heading}</h2>
      <div className="block float-left lg:float-right width-full">{data}</div>
    </div>
  );
}
