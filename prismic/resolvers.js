const resolver = (doc, uid) => {
  if (doc.link_type === "Web") {
    return doc.url;
  }
  if (doc.type === "page") {
    return `/${uid}`;
  }
  if (doc.type === "blog-post") {
    return `blog/${uid}`;
  }
  if (doc.type === "blog") {
    return `blog`;
  }
  if (doc.type === "talks") {
    return "talks";
  }
  return "/";
};

export const linkResolver = (doc) => {
  return resolver(doc, doc.uid);
};

export const hrefResolver = (doc) => {
  return resolver(doc, "[uid]");
};
