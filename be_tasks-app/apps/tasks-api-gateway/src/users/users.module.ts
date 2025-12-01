import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.TCP,
        options: { port: 3001 }
      }
    ])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
