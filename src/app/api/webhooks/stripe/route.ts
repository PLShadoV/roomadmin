import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  // TODO: weryfikacja sygnatury i aktualizacja Payment/Reservation
  return NextResponse.json({ received: true })
}
