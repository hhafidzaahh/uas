import { NextResponse } from 'next/server'

// List dashboard yang dibatasi role
const protectedRoutes = [
  '/dashboard/mahasiswa',
  '/dashboard/pengurus',
  '/dashboard/admin',
]

export function middleware(request) {
  const url = request.nextUrl
  const { pathname } = url

  // Ambil data user dari cookies (pakai localStorage di browser, tapi tidak bisa di middleware)
  // Jadi kita buat sederhana: kalau user belum login, redirect ke /login
  const user = request.cookies.get('user')?.value

  if (protectedRoutes.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const parsed = JSON.parse(user)
    const role = parsed.role

    // Cek apakah role-nya cocok dengan path
    if (
      (pathname === '/dashboard/mahasiswa' && role !== 'mahasiswa') ||
      (pathname === '/dashboard/pengurus' && role !== 'pengurus') ||
      (pathname === '/dashboard/admin' && role !== 'admin')
    ) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}
