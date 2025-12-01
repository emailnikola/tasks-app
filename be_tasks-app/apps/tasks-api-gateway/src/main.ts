import { NestFactory } from '@nestjs/core'
import { TasksApiGatewayModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(TasksApiGatewayModule)
  app.enableCors({
    origin: 'http://localhost:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })
  await app.listen(process.env.port ?? 3000)
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err)
  process.exit(1)
})
