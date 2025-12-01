import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { USERS_SERVICE } from '@app/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(
          'GATEWAY_JWT_SECRET',
          'a-fallback-secret'
        ),
        signOptions: { expiresIn: '1d' }
      }),
      inject: [ConfigService]
    }),
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
