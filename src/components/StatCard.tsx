export default function StatCard({ label, value }: { label: string, value: number }){
  return (
    <div className="rounded-2xl shadow p-6 bg-white">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}
