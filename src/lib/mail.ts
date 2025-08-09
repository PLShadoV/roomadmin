import nodemailer from 'nodemailer'

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
})

export async function sendMail(to: string, subject: string, html: string) {
  if (!to) return
  await mailer.sendMail({ from: 'RoomAdmin <no-reply@roomadmin.local>', to, subject, html })
}
