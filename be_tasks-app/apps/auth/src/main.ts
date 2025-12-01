import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'
import { AuthModule } from './auth.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3003
      }
    }
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  await app.listen()
  console.log('Auth Microservice is listening on port 3003')
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err)
  process.exit(1)
})
