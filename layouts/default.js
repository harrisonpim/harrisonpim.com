import Favicon from "../components/favicon";

export default function DefaultLayout({
  children,
  wide = false,
  debug = false,
  faviconEmoji = "👋",
}) {
  const style = "";
  if (!wide) {
    style.concat("max-w-measure ");
  }
  if (debug) {
    style.concat("debug ");
  }
  return (
    <div>
      <Favicon emoji={faviconEmoji} />
      <main className={style}>{children}</main>
    </div>
  );
}
