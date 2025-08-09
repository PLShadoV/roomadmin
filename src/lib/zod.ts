import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN','RECEPTIONIST','GUEST']).default('RECEPTIONIST')
})

export const roomSchema = z.object({
  number: z.string().min(1),
  type: z.string().min(1),
  beds: z.number().int().min(1),
  price: z.number().min(0),
  amenities: z.array(z.string()).default([]),
  status: z.enum(['AVAILABLE','OCCUPIED','CLEANING','UNAVAILABLE']).default('AVAILABLE')
})

export const guestSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  notes: z.string().optional()
})

export const reservationSchema = z.object({
  roomId: z.string().cuid(),
  guestId: z.string().cuid(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['PENDING','CONFIRMED','CANCELLED','CHECKED_IN','CHECKED_OUT']).default('PENDING'),
  total: z.number().min(0),
  deposit: z.number().min(0).optional()
})
