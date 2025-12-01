import { NestFactory } from '@nestjs/core'
import { UsersModule } from './users.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001
      }
    }
  )
  await app.listen()
  console.log('Users Microservice is listening on port 3001')
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err)
  process.exit(1)
})
