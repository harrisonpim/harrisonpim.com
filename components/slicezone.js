import React from "react";
import { RichText } from "prismic-reactjs";
import ImageWithCaption from "./ImageWithCaption";
import { customLink } from "../prismic/helpers";
import { linkResolver } from "../prismic/resolvers";

export default function SliceZone({ sliceZone }) {
  return sliceZone.map((slice) => {
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
      default:
        return null;
    }
  });
}
