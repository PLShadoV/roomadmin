import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any })

export async function createPaymentIntent(amount: number, currency = 'pln') {
  return stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency })
}
