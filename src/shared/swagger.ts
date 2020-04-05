import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication, domain) => {
  const options = new DocumentBuilder()
    .setTitle('大猫 API 文档系统')
    .setDescription('欢迎使用大猫 API 文档系统，三端的接口都在这儿！')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
  console.log(`Documentation is running on: http://${domain}/api-docs`);
};
