import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { randomUUID } from 'crypto'
import { Prisma } from 'generated/prisma/client'

const ALICE_ID = 'f7c8d9c0-1a2b-3c4d-5e6f-7a8b9c0d1e2f'
const TASK_COUNT = 200

const databaseUrl = process.env.TASKS_DATABASE_URL
if (!databaseUrl) {
  throw new Error('TASKS_DATABASE_URL is not defined for seeding')
}

const adapter = new PrismaPg({ connectionString: databaseUrl })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log(`--- Seeding ${TASK_COUNT} Tasks to Database ---`)
  const tasksData: Prisma.PrismaPromise<any>[] = []
  for (let i = 0; i < TASK_COUNT; i++) {
    tasksData.push(
      prisma.task.upsert({
        where: { id: `task-${i + 1}` },
        update: {},
        create: {
          id: randomUUID(),
          title: `Task #${i + 1}: Implement Feature ${i + 1}`,
          description: `Detailed description for task number ${i + 1}.`,
          status: 'TODO',
          userId: ALICE_ID
        }
      })
    )
  }
  await prisma.$transaction(tasksData)

  console.log(`--- ${TASK_COUNT} Tasks Seeding Complete ---`)
}

main()
  .catch((e) => {
    console.error('Error during tasks seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
