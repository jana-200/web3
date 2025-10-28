import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const expense = await prisma.expense.create({
  data: {
    date: new Date('2024-06-15T12:00:00Z'),
    description: 'Lunch with client',
    payer: 'Alice',
    amount: 45.50,
  },
  data: {
    date: new Date('2024-06-16T15:30:00Z'),
    description: 'Office supplies',
    payer: 'Bob',
    amount: 78.20,
  },
})