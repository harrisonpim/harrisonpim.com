import Head from "next/head";

function svgFavicon(emoji) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`;
}

export default function Favicon({ emoji }) {
  const href = decodeURI(`data:image/svg+xml,${svgFavicon(emoji)}`);
  return (
    <Head>
      <link rel="icon" href={href} />
    </Head>
  );
}
