import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
  const data = await req.json()
  const room = await prisma.room.update({ where: { id: params.id }, data })
  return NextResponse.json(room)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }){
  await prisma.room.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
