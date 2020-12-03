import Link from "next/link";
import { linkResolver, hrefResolver } from "../prismic/resolvers";

export default function BackButton({ href = "/", text = "back home" }) {
  return (
    <Link as={linkResolver(href)} href={hrefResolver(href)} passHref>
      <a className="no-underline pb-none text-gray">← {text}</a>
    </Link>
  );
}
