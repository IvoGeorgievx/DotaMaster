import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SnakeToCamelCaseInterceptor } from './interceptors/snakeToCamel.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new SnakeToCamelCaseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
