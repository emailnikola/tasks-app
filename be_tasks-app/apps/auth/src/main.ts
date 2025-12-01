import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AuthModule } from './auth.module'

async function bootstrap() {
  const servicePort = parseInt(process.env.PORT || '3003', 10)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: servicePort
      }
    }
  )
  await app.listen()
  console.log(`Auth Microservice is listening on port ${servicePort}`)
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err)
  process.exit(1)
})
