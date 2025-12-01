import { NestFactory } from '@nestjs/core'
import { UsersModule } from './users.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const servicePort = parseInt(process.env.PORT || '3001', 10)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: servicePort
      }
    }
  )
  await app.listen()
  console.log(`Users Microservice is listening on port ${servicePort}`)
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err)
  process.exit(1)
})
