import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { registerSchema } from '@/lib/zod'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
  const data = await req.json()
  const parsed = registerSchema.safeParse(data)
  if(!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } })
  if (exists) return NextResponse.json({ error: 'Email już istnieje' }, { status: 409 })

  const password = await bcrypt.hash(parsed.data.password, 10)
  const user = await prisma.user.create({ data: { ...parsed.data, password } })
  return NextResponse.json({ id: user.id })
}
