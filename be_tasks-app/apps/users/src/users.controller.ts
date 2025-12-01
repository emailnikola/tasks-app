import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { CreateUserDto, USER_PATTERNS } from '../../../libs/common/src'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_PATTERNS.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @MessagePattern(USER_PATTERNS.FIND_BY_EMAIL)
  findByEmail(@Payload() email: string) {
    return this.usersService.findByEmail(email)
  }
}
