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

export function PrismicScript() {
  return (
    <script
      async
      defer
      src={`https://static.cdn.prismic.io/prismic.min.js?repo=${repoName}&new=true`}
    />
  );
}
