import { Task } from '../../../../generated/prisma/client'

export interface PaginatedTasks {
  tasks: Task[]
  totalCount: number
}

export interface JwtPayload {
  sub: string
  email: string
}
