import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASKS_CLIENT',
        transport: Transport.TCP,
        options: { port: 3002 }
      }
    ])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
