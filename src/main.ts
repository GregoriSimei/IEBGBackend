import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorManager } from './config/errors/ErrorManager';
import { SwaggerConfig } from './config/SwaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorManager());
  SwaggerConfig(app);
  await app.listen(3000);
}
bootstrap();
