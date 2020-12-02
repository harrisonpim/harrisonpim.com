import Prismic from "prismic-javascript";

export const repoName = process.env.PRISMIC_REPO_NAME;
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`;
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

// Client method to query documents from the Prismic repo
export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

const resolver = (doc, uid) => {
  if (doc.link_type === "Web") {
    return doc.url;
  }
  if (doc.type === "page") {
    return `/${uid}`;
  }
  if (doc.type === "blog-post") {
    return `research-blog/${uid}`;
  }
  if (doc.type === "product") {
    return `shop/${uid}`;
  }
  if (doc.type === "shop") {
    return "shop";
  }
  if (doc.type === "blog-home") {
    return "research-blog";
  }
  return "/";
};

export const linkResolver = (doc) => {
  return resolver(doc, doc.uid);
};

export const hrefResolver = (doc) => {
  return resolver(doc, "[uid]");
};
