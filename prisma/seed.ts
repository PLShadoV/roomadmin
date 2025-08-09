import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const adminPass = await bcrypt.hash('admin123', 10)
  const recepPass = await bcrypt.hash('recep123', 10)

  await prisma.user.createMany({ data: [
    { email: 'admin@roomadmin.local', password: adminPass, name: 'Owner', role: 'ADMIN' },
    { email: 'desk@roomadmin.local', password: recepPass, name: 'Reception', role: 'RECEPTIONIST' },
  ]})

  await prisma.room.createMany({ data: [
    { number: '101', type: 'Double', beds: 2, price: 250, amenities: ['wifi','tv'], status: 'AVAILABLE' },
    { number: '102', type: 'Single', beds: 1, price: 180, amenities: ['wifi'], status: 'CLEANING' },
    { number: '201', type: 'Suite', beds: 3, price: 450, amenities: ['wifi','tv','ac'], status: 'AVAILABLE' },
  ]})
}

main().finally(() => prisma.$disconnect())
