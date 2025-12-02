import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MicroserviceClientsModule } from 'libs/clients/microservice-clients.module'

@Module({
  imports: [
    MicroserviceClientsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(
          'JWT_SECRET',
          'YOUR_VERY_STRONG_GATEWAY_SECRET_KEY'
        ),
        signOptions: { expiresIn: '1d' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
