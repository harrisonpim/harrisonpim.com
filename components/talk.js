import Link from "next/link";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../prismic/resolvers";
import { formatDate } from "../components/date";

export default function Talk({ talk }) {
  const title = RichText.asText(talk.primary.title);
  const host = RichText.asText(talk.primary.host);
  const location = RichText.asText(talk.primary.location);
  const date = formatDate(talk.primary.date);
  const url = talk.primary.url;
  return (
    <div className="py-4">
      <Link as={linkResolver(url)} href={linkResolver(url)}>
        <a className="no-underline pb-none font-normal">{title}</a>
      </Link>

      <div className="text-xs">
        <div className="text-gray">{date}</div>
        <div>{host}</div>
        <div>{location}</div>
      </div>
    </div>
  );
}
