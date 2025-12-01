import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { PrismaService } from './prisma/prisma.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AUTH_SERVICE } from '@app/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 }
      }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
  exports: [PrismaService]
})
export class TasksModule {}
