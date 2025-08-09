import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { reservationSchema } from '@/lib/zod'

export async function GET(){
  const resv = await prisma.reservation.findMany({ include: { room:true, guest:true } })
  return NextResponse.json(resv)
}

export async function POST(req: NextRequest){
  const data = await req.json()
  const parsed = reservationSchema.safeParse(data)
  if(!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { roomId, startDate, endDate } = parsed.data

  const conflict = await prisma.reservation.findFirst({
    where: {
      roomId,
      status: { in: ['PENDING','CONFIRMED','CHECKED_IN'] },
      AND: [
        { startDate: { lt: new Date(endDate) } },
        { endDate: { gt: new Date(startDate) } },
      ]
    }
  })
  if(conflict) return NextResponse.json({ error: 'Konflikt rezerwacji: pokój zajęty w tym okresie.' }, { status: 409 })

  const resv = await prisma.reservation.create({ data: { ...parsed.data, startDate: new Date(startDate), endDate: new Date(endDate) } })
  return NextResponse.json(resv)
}
