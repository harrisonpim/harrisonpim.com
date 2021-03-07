import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic/resolvers";
import Block from "./block";

export default function Other({ data }) {
  const renderedOther = data.data.body.map((thing, idx) => (
    <div className="pb-2" key={idx}>
      <div className="text-base">{RichText.asText(thing.primary.title)}</div>
      <div className="text-xs">
        <RichText
          render={thing.primary.description}
          linkResolver={linkResolver}
        />
      </div>
    </div>
  ));

  return <Block heading="Other Stuff" data={renderedOther} />;
}
