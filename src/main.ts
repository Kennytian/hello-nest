import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BizLogger } from './utils/biz-logger';
import { setupSwagger } from './shared/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new BizLogger(),
  });

  await app.listen(3004, '0.0.0.0');
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  console.log(`Application is running on: ${await app.getUrl()}/api-docs`);
}
bootstrap();
