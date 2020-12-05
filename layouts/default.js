import Favicon from "../components/favicon";

export default function DefaultLayout({
  children,
  wide = false,
  debug = false,
  faviconEmoji = "👋",
}) {
  const style = [
    `${wide ? "" : "max-w-measure"}`,
    `${debug ? "debug" : ""}`,
  ].join(" ");

  return (
    <div>
      <Favicon emoji={faviconEmoji} />
      <main className={style}>{children}</main>
    </div>
  );
}
