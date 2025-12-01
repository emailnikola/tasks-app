import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TasksController } from './tasks/tasks.controller'
import { AuthController } from './auth/auth.controller'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { TASKS_SERVICE, AUTH_SERVICE } from '../../../libs/common/src'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10
      }
    ]),
    ClientsModule.register([
      {
        name: TASKS_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 }
      },
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 }
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
