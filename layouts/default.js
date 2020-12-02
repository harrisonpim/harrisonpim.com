export default function DefaultLayout({ children }) {
  return (
    <main className="prose">
      <div>{children}</div>
    </main>
  );
}
