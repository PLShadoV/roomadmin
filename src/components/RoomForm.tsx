'use client'
import { useState } from 'react'

export default function RoomForm({ onSaved }: { onSaved?: () => void }){
  const [form, setForm] = useState({ number:'', type:'', beds:1, price:0 })
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/rooms', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ ...form, amenities:[], status:'AVAILABLE' }) })
    setLoading(false)
    if(res.ok){ onSaved?.(); setForm({ number:'', type:'', beds:1, price:0 }) }
  }

  return (
    <form onSubmit={submit} className="grid gap-2">
      <input className="border rounded px-3 py-2" placeholder="Numer" value={form.number} onChange={e=>setForm({...form, number:e.target.value})}/>
      <input className="border rounded px-3 py-2" placeholder="Typ" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}/>
      <input type="number" className="border rounded px-3 py-2" placeholder="Łóżka" value={form.beds} onChange={e=>setForm({...form, beds:Number(e.target.value)})}/>
      <input type="number" className="border rounded px-3 py-2" placeholder="Cena" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
      <button disabled={loading} className="rounded bg-slate-900 text-white px-4 py-2">{loading? 'Zapisywanie...':'Zapisz pokój'}</button>
    </form>
  )
}
