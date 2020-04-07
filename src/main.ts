import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/swagger';
import { MyLogger } from './utils/my-logger';

async function bootstrap() {
  const host = '127.0.0.1';
  const port = 3004;

  const app = await NestFactory.create(AppModule, {
    // logger: ['warn','error'],
    logger: new MyLogger(),
  });

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app, `${host}:${port}`);
  }

  await app.listen(port, host);

  console.log('process.env.NODE_ENV======', process.env.NODE_ENV);

  console.log(`Application is running on: http://${host}:${port}/cats`);
}
bootstrap();
