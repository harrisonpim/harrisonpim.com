import React from "react";
import { RichText } from "prismic-reactjs";
import ImageWithCaption from "./ImageWithCaption";
import { customLink } from "../utils/prismic-helpers";
import { linkResolver } from "../prismic-configuration";

export default function SliceZone({ sliceZone }) {
  return sliceZone.map((slice) => {
    switch (slice.type) {
      case "img":
        return <ImageWithCaption slice={slice} />;
      case "paragraph":
        return (
          <RichText
            render={slice}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
        );
      default:
        return null;
    }
  });
}
