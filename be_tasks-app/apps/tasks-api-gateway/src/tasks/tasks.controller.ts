import {
  Controller,
  Post,
  Body,
  UseGuards,
  Inject,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { CurrentUser } from '../decorators/current-user.decorator'
import { CreateTaskDto, TASKS_SERVICE } from '../../../../libs/common/src'
import type { JwtPayload, TaskResponseDto } from '@app/common'
import { firstValueFrom } from 'rxjs'

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(@Inject(TASKS_SERVICE) private tasksClient: ClientProxy) {}

  @Post('query')
  async queryTasks(
    @Body() query: any,
    @CurrentUser() user: JwtPayload
  ): Promise<TaskResponseDto[]> {
    const payload = { userId: user.sub, ...query }
    return firstValueFrom(this.tasksClient.send('tasks.query', payload))
  }

  @Post('create')
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: JwtPayload
  ): Promise<TaskResponseDto[]> {
    createTaskDto.userId = user.sub
    return firstValueFrom(this.tasksClient.send('tasks.create', createTaskDto))
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateData: { status: 'TODO' | 'IN_PROGRESS' | 'DONE' },
    @CurrentUser() user: JwtPayload
  ): Promise<TaskResponseDto> {
    const payload = {
      where: { id: taskId, userId: user.sub },
      data: updateData
    }
    return firstValueFrom(this.tasksClient.send('tasks.update', payload))
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') taskId: string,
    @CurrentUser() user: JwtPayload
  ): Promise<TaskResponseDto> {
    const payload = {
      id: taskId,
      userId: user.sub
    }
    return firstValueFrom(this.tasksClient.send('tasks.delete', payload))
  }
}
