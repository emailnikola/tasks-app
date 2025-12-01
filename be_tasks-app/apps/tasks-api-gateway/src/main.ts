import { NestFactory } from '@nestjs/core'
import { TasksApiGatewayModule } from './app.module'

async function bootstrap() {
  const servicePort = parseInt(process.env.PORT || '3000', 10)
  const app = await NestFactory.create(TasksApiGatewayModule)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })
  await app.listen(servicePort)
  console.log(`Main APP is listening on port ${servicePort}`)
}

bootstrap().catch((err) => {
  console.error('Application failed to start:', err)
  process.exit(1)
})
