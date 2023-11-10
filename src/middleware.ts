import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.nextUrl.pathname.startsWith('/checkout')) {
    try {
      const token = request.cookies.get('token')?.value ?? ''
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED),
      )
      return NextResponse.next()
    } catch (error) {
      console.error(error)
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('p', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
