import '../../styles/app.css'

import Link from 'next/link'

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <Link href="/" className="no-underline">
        <h1 className="text-3xl leading-tight font-space-grotesk">
          Harrison Pim
        </h1>
      </Link>
      {children}
    </div>
  )
}
