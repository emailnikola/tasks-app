import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '../../../../generated/prisma/user'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get<string>('USERS_DATABASE_URL')
    if (!databaseUrl) {
      throw new Error('USERS_DATABASE_URL is not defined')
    }
    const adapter = new PrismaPg({ connectionString: databaseUrl })
    super({ adapter })
  }

  async onModuleInit() {
    try {
      await this.$connect()
      this.logger.log('Users Service - Successfully connected to database')
    } catch (error) {
      this.logger.error('Users Service - Failed to connect to database', error)
      throw error
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log('Users Service - Disconnected from database')
  }
}
