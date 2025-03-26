import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SnakeToCamelCaseInterceptor } from './interceptors/snakeToCamel.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalInterceptors(new SnakeToCamelCaseInterceptor());
}
bootstrap();
