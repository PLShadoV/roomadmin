import { prisma } from '@/lib/db'
import StatCard from '@/components/StatCard'

export default async function Dashboard() {
  const [rooms, reservations, guests] = await Promise.all([
    prisma.room.count(),
    prisma.reservation.count(),
    prisma.guest.count()
  ])

  return (
    <main className="grid gap-4 md:grid-cols-3">
      <StatCard label="Pokoje" value={rooms} />
      <StatCard label="Rezerwacje" value={reservations} />
      <StatCard label="Goście" value={guests} />
    </main>
  )
}
