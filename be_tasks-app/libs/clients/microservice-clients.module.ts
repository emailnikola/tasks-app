import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AUTH_SERVICE, USERS_SERVICE, TASKS_SERVICE } from '@app/common' // Assuming these are your constant tokens

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.NODE_ENV === 'production' ? 'be_auth' : 'localhost',
          port: 3003,
          retryAttempts: 5,
          retryDelay: 2000
        }
      },
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.NODE_ENV === 'production' ? 'be_users' : 'localhost',
          port: 3001,
          retryAttempts: 5,
          retryDelay: 2000
        }
      },
      {
        name: TASKS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.NODE_ENV === 'production' ? 'be_tasks' : 'localhost',
          port: 3002,
          retryAttempts: 5,
          retryDelay: 2000
        }
      }
    ])
  ],
  exports: [ClientsModule]
})
export class MicroserviceClientsModule {}
