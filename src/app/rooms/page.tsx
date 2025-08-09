import { prisma } from '@/lib/db'
import RoomForm from '@/components/RoomForm'

export default async function RoomsPage(){
  const rooms = await prisma.room.findMany({ orderBy:{ number:'asc' } })
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-4 shadow">
        <h2 className="font-semibold mb-3">Dodaj pokój</h2>
        <RoomForm />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow">
        <h2 className="font-semibold mb-3">Lista pokoi</h2>
        <ul className="divide-y">
          {rooms.map(r=> (
            <li key={r.id} className="py-2 flex justify-between">
              <span>#{r.number} — {r.type}, łóżka: {r.beds}, {r.price.toString()} PLN</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
