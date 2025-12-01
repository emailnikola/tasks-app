import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './schema.prisma',
  migrations: {
    path: './migrations',
    seed: 'npx tsx apps/users/src/prisma/seed.ts'
  },
  datasource: {
    url: env('USERS_DATABASE_URL')
  }
})
