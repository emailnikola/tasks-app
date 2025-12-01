import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [PrismaService]
})
export class UsersModule {}
