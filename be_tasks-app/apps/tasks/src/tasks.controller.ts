import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { TasksService } from './tasks.service'
import { Prisma } from '../../../generated/prisma/task'

interface TaskQueryPayload {
  userId: string
  skip?: number
  take?: number
  cursor?: Prisma.TaskWhereUniqueInput
  where?: Prisma.TaskWhereInput
  orderBy?: Prisma.TaskOrderByWithRelationInput
}

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('tasks.query')
  queryTasks(@Payload() payload: TaskQueryPayload) {
    const { userId, ...queryParams } = payload
    return this.tasksService.tasks(userId, queryParams)
  }

  @MessagePattern('tasks.create')
  createTask(@Payload() query: Prisma.TaskCreateInput) {
    return this.tasksService.createTask(query)
  }

  @MessagePattern('tasks.update')
  updateTask(
    @Payload()
    payload: {
      where: Prisma.TaskWhereUniqueInput & { userId: string }
      data: Prisma.TaskUpdateInput
    }
  ) {
    return this.tasksService.updateTask(payload)
  }

  @MessagePattern('tasks.delete')
  deleteTask(
    @Payload()
    where: Prisma.TaskWhereUniqueInput & { userId: string }
  ) {
    return this.tasksService.deleteTask(where)
  }
}
