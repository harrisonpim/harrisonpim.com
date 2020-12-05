export default function BackButton({ href = "/", text = "back home" }) {
  return (
    <a className="no-underline text-gray" href={href}>
      ← {text}
    </a>
  );
}
