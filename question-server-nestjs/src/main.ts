import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { TransformInterceptor } from './transform/transform.interceptor.js';
import { HttpExceptionFilter } from './http-exception/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  app.useGlobalInterceptors(new TransformInterceptor())

  app.useGlobalFilters(new HttpExceptionFilter())
  
  app.enableCors();//跨域

  await app.listen(process.env.PORT ?? 3005);
}
await bootstrap();
