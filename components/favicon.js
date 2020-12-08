import Head from "next/head";

export default function Favicon({ emoji }) {
  const svg = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`;
  return (
    <Head>
      <link rel="icon" href={svg} />
    </Head>
  );
}
