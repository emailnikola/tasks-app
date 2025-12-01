import { Task } from 'generated/prisma'

export interface PaginatedTasks {
  tasks: Task[]
  totalCount: number
}

export interface JwtPayload {
  sub: string
  email: string
}
