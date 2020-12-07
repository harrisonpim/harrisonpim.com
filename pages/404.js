import BackButton from "../components/backButton";
import DefaultLayout from "../components/defaultLayout";

export default function Custom404() {
  return (
    <DefaultLayout faviconEmoji="😬">
      <BackButton />
      <h1>404 - Page Not Found</h1>
    </DefaultLayout>
  );
}
