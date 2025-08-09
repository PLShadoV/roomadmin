import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { guestSchema } from '@/lib/zod'

export async function GET(){
  const guests = await prisma.guest.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(guests)
}

export async function POST(req: NextRequest){
  const data = await req.json()
  const parsed = guestSchema.safeParse(data)
  if(!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const guest = await prisma.guest.create({ data: parsed.data })
  return NextResponse.json(guest)
}
