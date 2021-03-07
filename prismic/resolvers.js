export const linkResolver = (doc) => {
  if (doc.link_type === "Web") {
    return doc.url;
  }
  if (doc.type === "page") {
    return `/${doc.uid}`;
  }
  if (doc.type === "blog-post") {
    return `blog/${doc.uid}`;
  }
  if (doc.type === "blog") {
    return `blog`;
  }
  if (doc.type === "talks") {
    return "talks";
  }
  return "/";
};
