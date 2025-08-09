import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/jwt'

const openPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/webhooks/stripe'
]

export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl
  if (openPaths.some(p => pathname.startsWith(p))) return NextResponse.next()
  if (pathname.startsWith('/api/')){
    const token = req.headers.get('authorization')?.replace('Bearer ','')
    if(!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try { verifyJWT(token) } catch { return NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/api/:path*'] }
