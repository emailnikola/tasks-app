import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { PrismaService } from './prisma/prisma.service'
import { MicroserviceClientsModule } from 'libs/clients/microservice-clients.module'

@Module({
  imports: [
    MicroserviceClientsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
  exports: [PrismaService]
})
export class TasksModule {}
