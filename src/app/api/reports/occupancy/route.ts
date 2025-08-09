import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(){
  const totalRooms = await prisma.room.count()
  const occupied = await prisma.reservation.count({
    where: {
      status: { in: ['CONFIRMED','CHECKED_IN'] },
      startDate: { lte: new Date() },
      endDate: { gt: new Date() }
    }
  })
  const occupancy = totalRooms ? Math.round((occupied/totalRooms)*100) : 0
  return NextResponse.json({ totalRooms, occupied, occupancy })
}
