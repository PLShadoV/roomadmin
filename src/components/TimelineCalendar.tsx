'use client'
import { useMemo, useState } from 'react'
import { addDays, eachDayOfInterval, format } from 'date-fns'

type Booking = { id: string, roomNumber: string, startDate: string, endDate: string, status: string }

type Props = { rooms: { id: string, number: string }[], bookings: Booking[] }

export default function TimelineCalendar({ rooms, bookings }: Props){
  const [start] = useState(new Date())
  const end = addDays(start, 14)
  const days = useMemo(() => eachDayOfInterval({ start, end }), [start,end])

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="min-w-[900px] w-full">
        <thead>
          <tr>
            <th className="sticky left-0 bg-white p-2 text-left border-b">Pokój</th>
            {days.map(d => (
              <th key={d.toISOString()} className="p-2 text-xs border-b whitespace-nowrap">{format(d,'dd.MM')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id} className="border-t">
              <td className="sticky left-0 bg-white p-2 font-medium">{room.number}</td>
              {days.map(d => {
                const hit = bookings.find(b => b.roomNumber===room.number && new Date(b.startDate) <= d && d < new Date(b.endDate))
                return (
                  <td key={room.id+format(d,'yyyy-MM-dd')} className={`h-10 text-center text-xs ${hit? 'bg-rose-200':'bg-emerald-100'}`}></td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
