import { prisma } from '@/lib/db'
import TimelineCalendar from '@/components/TimelineCalendar'

export default async function CalendarPage(){
  const rooms = await prisma.room.findMany({ select: { id:true, number:true } })
  const bookings = await prisma.reservation.findMany({
    select: { id:true, startDate:true, endDate:true, status:true, room: { select: { number:true } } }
  })
  const mapped = bookings.map(b => ({ id: b.id, roomNumber: b.room.number, startDate: b.startDate.toISOString(), endDate: b.endDate.toISOString(), status: b.status }))
  return <TimelineCalendar rooms={rooms} bookings={mapped} />
}
