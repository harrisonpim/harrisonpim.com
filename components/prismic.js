import { repoName } from "../prismic-configuration";

export default function PrismicScript() {
  return (
    <script
      async
      defer
      src={`https://static.cdn.prismic.io/prismic.min.js?repo=${repoName}&new=true`}
    />
  );
}
