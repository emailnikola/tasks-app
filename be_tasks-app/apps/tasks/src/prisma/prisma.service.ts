import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '../../../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get<string>('TASKS_DATABASE_URL')
    if (!databaseUrl) {
      throw new Error('TASKS_DATABASE_URL is not defined')
    }
    const adapter = new PrismaPg({ connectionString: databaseUrl })
    super({ adapter })
  }

  async onModuleInit() {
    try {
      await this.$connect()
      this.logger.log('Tasks Service - Successfully connected to database')
    } catch (error) {
      this.logger.error('Tasks Service - Failed to connect to database', error)
      throw error
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log('Tasks Service - Disconnected from database')
  }
}
