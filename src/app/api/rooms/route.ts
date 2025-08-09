import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { roomSchema } from '@/lib/zod'

export async function GET(){
  const rooms = await prisma.room.findMany({ orderBy: { number: 'asc' } })
  return NextResponse.json(rooms)
}

export async function POST(req: NextRequest){
  const data = await req.json()
  const parsed = roomSchema.safeParse(data)
  if(!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const room = await prisma.room.create({ data: parsed.data })
  return NextResponse.json(room)
}
