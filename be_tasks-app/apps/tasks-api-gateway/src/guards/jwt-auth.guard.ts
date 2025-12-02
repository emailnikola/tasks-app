import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject
} from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Request } from 'express'
import { ClientProxy } from '@nestjs/microservices'
import { AUTH_SERVICE, AUTH_PATTERNS } from '../../../../libs/common/src'
import { User } from '../../../../generated/prisma/user'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException('No token provided')
    }
    const [type, token] = authHeader.split(' ')
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format')
    }

    try {
      const result: { valid: boolean; payload: User | undefined } =
        await firstValueFrom(
          this.authClient.send(AUTH_PATTERNS.VALIDATE_TOKEN, token)
        )
      if (!result.valid) {
        throw new UnauthorizedException('Invalid token')
      }
      request.user = result.payload
      return true
    } catch (error) {
      console.error('ERROR >>> ', error)
      throw new UnauthorizedException('Invalid token')
    }
  }
}
