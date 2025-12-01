import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './schema.prisma',
  migrations: {
    path: './migrations',
    seed: 'npx tsx apps/tasks/src/prisma/seed.ts'
  },
  datasource: {
    url: env('TASKS_DATABASE_URL')
  }
})
