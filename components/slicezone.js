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

  const slices = sliceZone.map((slice, idx) => {
    switch (slice.slice_type) {
      case "text":
        return (
          <div key={idx}>
            <RichText
              render={slice.primary.text}
              linkResolver={linkResolver}
              serializeHyperlink={customLink}
            />
          </div>
        );
      case "image_with_caption":
        return (
          <div key={idx}>
            <ImageWithCaption slice={slice} />
          </div>
        );
      case "code_snippet":
        return (
          <div key={idx}>
            <CodeSnippet slice={slice} />
          </div>
        );
      default:
        return <div key={idx} />;
    }
  });

  return <div className="prose">{slices}</div>;
}
