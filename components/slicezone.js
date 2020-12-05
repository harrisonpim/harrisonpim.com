import { RichText } from "prismic-reactjs";
import { customLink } from "../prismic/helpers";
import { linkResolver } from "../prismic/resolvers";
import CodeBlock from "./codeBlock";
import ImageWithCaption from "./ImageWithCaption";

export default function SliceZone({ sliceZone }) {
  return (
    <div className="prose">
      {sliceZone.map((slice) => {
        switch (slice.slice_type) {
          case "img":
            return <ImageWithCaption slice={slice} />;
          case "text":
            return (
              <RichText
                render={slice.primary.text}
                linkResolver={linkResolver}
                serializeHyperlink={customLink}
              />
            );
          case "code":
            return <CodeBlock />;
          default:
            return null;
        }
      })}
    </div>
  );
}
