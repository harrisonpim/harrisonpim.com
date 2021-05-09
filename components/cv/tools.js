import { RichText } from "prismic-reactjs";
import Block from "./block";

export default function Tools({ data }) {
  const renderedTools = data.data.body.map((tool, idx) => (
    <div className="pb-1" key={idx}>
      <div className="text-base">{RichText.asText(tool.primary.category)}</div>
      <div className="text-xs">{RichText.asText(tool.primary.set)}</div>
    </div>
  ));

  return <Block heading="Skills & Tools" data={renderedTools} />;
}
