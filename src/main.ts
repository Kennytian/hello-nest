import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BizLogger } from './utils/biz-logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new BizLogger(),
  });
  const options = new DocumentBuilder()
    .setTitle('大猫 API 文档系统')
    .setDescription('欢迎使用大猫 API 文档系统，三端的接口都在这儿！')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
