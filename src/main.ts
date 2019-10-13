import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BizLogger } from './utils/biz-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new BizLogger(),
  });
  await app.listen(3000);
}
bootstrap();
