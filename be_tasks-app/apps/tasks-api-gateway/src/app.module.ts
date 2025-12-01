import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TasksController } from './tasks/tasks.controller'
import { AuthController } from './auth/auth.controller'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { MicroserviceClientsModule } from 'libs/clients/microservice-clients.module'

@Module({
  imports: [
    MicroserviceClientsModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10
      }
    ])
  ],
  controllers: [TasksController, AuthController],
  providers: [
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class TasksApiGatewayModule {}
