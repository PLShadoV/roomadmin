import './globals.css'
import React from 'react'

export const metadata = { title: 'RoomAdmin', description: 'Zarządzanie pokojami i rezerwacjami' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto p-4">
          <header className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-semibold">RoomAdmin</h1>
            <nav className="flex gap-3 text-sm">
              <a href="/" className="underline">Dashboard</a>
              <a href="/calendar" className="underline">Kalendarz</a>
              <a href="/rooms" className="underline">Pokoje</a>
              <a href="/reservations" className="underline">Rezerwacje</a>
              <a href="/guests" className="underline">Goście</a>
              <a href="/settings" className="underline">Ustawienia</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
