import { RichText } from "prismic-reactjs";
import { customLink } from "../prismic/helpers";
import { linkResolver } from "../prismic/resolvers";
import CodeSnippet from "./codeSnippet";
import ImageWithCaption from "./imageWithCaption";
import { useEffect } from "react";
import hljs from "highlight.js";
import python from "highlight.js/lib/languages/python";

hljs.registerLanguage("python", python);

export default function SliceZone({ sliceZone }) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);
  
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
          case "code_snippet":
            return <CodeSnippet slice={slice} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
