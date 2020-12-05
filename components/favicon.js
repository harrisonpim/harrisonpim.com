import Head from "next/head";

export default function Favicon({ emoji }) {
  const linkString = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

  return (
    <Head>
      <link rel="icon" href={linkString} />
    </Head>
  );
}
