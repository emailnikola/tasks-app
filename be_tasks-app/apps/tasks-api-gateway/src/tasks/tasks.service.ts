import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { Task } from '../../../../generated/prisma/client'

@Injectable()
export class TasksService {
  constructor(@Inject('TASKS_CLIENT') private tasksClient: ClientProxy) {}

  findAll() {
    return this.tasksClient.send('tasks.findAll', {})
  }

  async queryTasks(query: any): Promise<Task[]> {
    return firstValueFrom(this.tasksClient.send('tasks.query', query))
  }

  async createTask(data: any): Promise<Task> {
    return firstValueFrom(this.tasksClient.send('tasks.create', data))
  }
}
