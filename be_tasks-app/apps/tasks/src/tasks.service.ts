import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { Task, Prisma } from '../../../generated/prisma/task'
import type { PaginatedTasks } from '@app/common'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async tasks(
    userId: string,
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.TaskWhereUniqueInput
      where?: Prisma.TaskWhereInput
      orderBy?: Prisma.TaskOrderByWithRelationInput
    }
  ): Promise<PaginatedTasks> {
    const { skip, take, cursor, where, orderBy } = params
    const finalWhere: Prisma.TaskWhereInput = {
      ...where,
      userId: userId
    }
    const tasks = await this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where: finalWhere,
      orderBy
    })
    const totalCount = await this.prisma.task.count({
      where: finalWhere
    })
    return { tasks, totalCount }
  }

  async task(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput
  ): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: taskWhereUniqueInput
    })
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data
    })
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput
    data: Prisma.TaskUpdateInput
  }): Promise<Task> {
    const { where, data } = params
    return this.prisma.task.update({
      data,
      where
    })
  }

  async deleteTask(
    where: Prisma.TaskWhereUniqueInput & { userId: string }
  ): Promise<Task> {
    return this.prisma.task.delete({
      where
    })
  }
}
