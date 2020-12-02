import DefaultLayout from "../layouts/default";

export default function Custom404() {
  return (
    <DefaultLayout parentHref="/" parentText="Home">
      <h1>404 - Page Not Found</h1>
    </DefaultLayout>
  );
}
