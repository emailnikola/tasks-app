import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: { port: 3003 }
      }
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
