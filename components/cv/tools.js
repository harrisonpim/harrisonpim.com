import { RichText } from "prismic-reactjs";
import Block from "./block";

export default function Tools({ data }) {
  const renderedTools = data.data.body.map((tool) => (
    <div className="text-base pb-1">
      <div className="text-base">{RichText.asText(tool.primary.category)}</div>
      <div className="text-xs">{RichText.asText(tool.primary.set)}</div>
    </div>
  ));

  return <Block heading="Tools I Use" data={renderedTools} />;
}
