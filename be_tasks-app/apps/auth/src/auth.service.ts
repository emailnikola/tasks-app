import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ClientProxy } from '@nestjs/microservices'
import {
  LoginDto,
  RegisterDto,
  USERS_SERVICE,
  USER_PATTERNS,
  JwtPayload,
  UserWithoutPassword
} from '../../../libs/common/src'
import * as bcrypt from 'bcrypt'
import { firstValueFrom } from 'rxjs'
import { User } from '../../../generated/prisma/client'

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private usersClient: ClientProxy,
    private jwtService: JwtService
  ) {}

  async register(registerData: RegisterDto) {
    try {
      const user: UserWithoutPassword = await firstValueFrom(
        this.usersClient.send(USER_PATTERNS.CREATE, registerData)
      )
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email
      }
      const token = this.jwtService.sign(payload)
      return {
        user,
        access_token: token
      }
    } catch (error) {
      console.error('Register ERROR >>>', error)
      throw error
    }
  }

  async login(loginData: LoginDto) {
    let user: User
    try {
      user = await firstValueFrom(
        this.usersClient.send(USER_PATTERNS.FIND_BY_EMAIL, loginData.email)
      )
    } catch (error) {
      console.error('login ERROR >>> ', error)
      throw new UnauthorizedException('Invalid credentials')
    }
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password
    )
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email
    }
    const { password, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
      access_token: this.jwtService.sign(payload)
    }
  }

  async validateToken(token: string) {
    try {
      const payload = (await this.jwtService.verify(token)) as JwtPayload
      return { valid: true, payload }
    } catch (error) {
      console.error('validateToken ERROR >>> ', error)
      return { valid: false, payload: null }
    }
  }
}
