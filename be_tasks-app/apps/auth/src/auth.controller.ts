import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto, AUTH_PATTERNS } from '../../../libs/common/src'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.REGISTER)
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  login(@Payload() loginData: LoginDto) {
    return this.authService.login(loginData)
  }

  @MessagePattern(AUTH_PATTERNS.VALIDATE_TOKEN)
  validateToken(@Payload() token: string) {
    return this.authService.validateToken(token)
  }
}
