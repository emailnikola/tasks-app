import { NestFactory } from '@nestjs/core'
import { TasksModule } from './tasks.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const servicePort = parseInt(process.env.PORT || '3002', 10)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TasksModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: servicePort
      }
    }
  )
  await app.listen()
  console.log(`Tasks Microservice is listening on port ${servicePort}`)
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err)
  process.exit(1)
})
