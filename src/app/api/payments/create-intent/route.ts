import { NextRequest, NextResponse } from 'next/server'
import { createPaymentIntent } from '@/lib/payments'

export async function POST(req: NextRequest){
  const { amount } = await req.json()
  const intent = await createPaymentIntent(Number(amount), 'pln')
  return NextResponse.json({ clientSecret: intent.client_secret })
}
