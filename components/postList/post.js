import React from "react";
import { default as NextLink } from "next/link";
import { RichText } from "prismic-reactjs";

import Lead from "./lead";
import { linkResolver } from "../../prismic-configuration";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Post({ post }) {
  const title = RichText.asText(post.data.title)
    ? RichText.asText(post.data.title)
    : "Untitled";
  const date = formatDate(post.data.date);
  return (
    <div>
      <NextLink as={linkResolver(post)} href={linkResolver(post)}>
        <a className="no-underline pb-none">
          <h2 className="pb-none">{title}</h2>
        </a>
      </NextLink>
      <div className="text-sm text-silver pb-3">{date}</div>
      <Lead sliceZone={post.data.body1} textLimit={300} />
    </div>
  );
}
