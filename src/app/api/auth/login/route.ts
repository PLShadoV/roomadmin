import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { loginSchema } from '@/lib/zod'
import bcrypt from 'bcrypt'
import { signJWT } from '@/lib/jwt'

export async function POST(req: NextRequest){
  const data = await req.json()
  const parsed = loginSchema.safeParse(data)
  if(!parsed.success) return NextResponse.json({ error: 'Błędne dane' }, { status: 400 })
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
  if(!user) return NextResponse.json({ error: 'Nie znaleziono użytkownika' }, { status: 404 })
  const ok = await bcrypt.compare(parsed.data.password, user.password)
  if(!ok) return NextResponse.json({ error: 'Złe hasło' }, { status: 401 })
  const token = signJWT({ sub: user.id, role: user.role, name: user.name })
  return NextResponse.json({ token })
}
