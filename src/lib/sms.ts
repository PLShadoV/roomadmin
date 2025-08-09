import Twilio from 'twilio'

const sid = process.env.SMS_TWILIO_SID
const token = process.env.SMS_TWILIO_TOKEN
const from = process.env.SMS_TWILIO_FROM

export async function sendSMS(to: string, body: string) {
  if (!sid || !token || !from) return
  const client = Twilio(sid!, token!)
  await client.messages.create({ from, to, body })
}
