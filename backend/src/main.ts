import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
  })

  const port = process.env.PORT || 10000

  await app.listen(port, '0.0.0.0') // 👈 ESTA LÍNEA ES CLAVE

  console.log(`🚀 RUNNING ON ${port}`)
}

bootstrap()