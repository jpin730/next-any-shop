import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    try {
      const token = request.cookies.get('token')?.value ?? ''
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED),
      )
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    } catch (error) {
      console.error(error)
      return NextResponse.next()
    }
  }

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

  if (
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/api/admin')
  ) {
    try {
      const token = request.cookies.get('token')?.value ?? ''
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED),
      )
      const { role = '' } = payload

      if (role !== 'admin') {
        throw new Error('Role is not admin')
      }

      return NextResponse.next()
    } catch (error) {
      console.error(error)

      if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }

      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
