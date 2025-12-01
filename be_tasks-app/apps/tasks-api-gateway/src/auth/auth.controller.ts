import { Controller, Post, Body, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  LoginDto,
  RegisterDto,
  AUTH_SERVICE,
  AUTH_PATTERNS
} from '../../../../libs/common/src'
import { firstValueFrom } from 'rxjs'
import { User } from '../../../../generated/prisma/client'

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  @Post('register')
  async register(@Body() registerData: RegisterDto): Promise<User> {
    return firstValueFrom(
      this.authClient.send(AUTH_PATTERNS.REGISTER, registerData)
    )
  }

  @Post('login')
  async login(@Body() loginData: LoginDto): Promise<User> {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.LOGIN, loginData))
  }
}
