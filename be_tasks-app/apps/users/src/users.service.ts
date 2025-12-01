import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '@app/common'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserData: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserData.email }
    })
    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }
    const hashedPassword = await bcrypt.hash(createUserData.password, 10)
    const user = await this.prisma.user.create({
      data: {
        ...createUserData,
        password: hashedPassword
      }
    })
    const { password, ...result } = user
    return result
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    return user
  }
}
