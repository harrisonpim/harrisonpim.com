import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  // Create a new Headers object from the request headers
  const requestHeaders = new Headers(request.headers)

  // If the request is for a blog post, set the x-next-blog-post-slug header
  // This is used in the blog layout to load the correct post metadata
  if (request.nextUrl.pathname.startsWith('/blog/')) {
    requestHeaders.set(
      'x-next-blog-post-slug',
      request.nextUrl.pathname.replace('/blog/', ''),
    )
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/blog/:path*',
}
