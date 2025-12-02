import { PrismaClient } from '../../../../generated/prisma/user'
import * as bcrypt from 'bcrypt'
import { PrismaPg } from '@prisma/adapter-pg'

const databaseUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_USERS}?schema=public`
const adapter = new PrismaPg({ connectionString: databaseUrl })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('--- Seeding Users Database ---')
  const hashedPassword = await bcrypt.hash('password123', 10)
  await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      id: 'f7c8d9c0-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Smith',
      password: hashedPassword
    }
  })
  await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Johnson',
      password: hashedPassword
    }
  })
  console.log('--- Users Seeding Complete ---')
}

main()
  .catch((e) => {
    console.error('Error during users seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
