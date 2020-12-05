import { RichText } from "prismic-reactjs";
import Block from "./block";

export default function Other({ data }) {
  const renderedOther = data.data.body.map((thing) => (
    <div>
      <div>{RichText.asText(thing.primary.title)}</div>
      <div>{RichText.asText(thing.primary.description)}</div>
    </div>
  ));

  return <Block heading="Other Stuff" data={renderedOther} />;
}
