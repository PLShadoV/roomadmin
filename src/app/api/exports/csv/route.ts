import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { toCSV } from '@/lib/csv'

export async function GET(req: NextRequest){
  const type = req.nextUrl.searchParams.get('type') || 'reservations'
  if(type==='reservations'){
    const rows = await prisma.reservation.findMany({ include: { room:true, guest:true } })
    const csv = toCSV(rows.map(r=>({ id:r.id, room:r.room.number, guest:`${r.guest.firstName} ${r.guest.lastName}`,
      start: r.startDate.toISOString(), end: r.endDate.toISOString(), total: r.total.toString(), status: r.status })))
    return new NextResponse(csv, { headers: { 'Content-Type':'text/csv', 'Content-Disposition':'attachment; filename="reservations.csv"' }})
  }
  return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
}
