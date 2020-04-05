import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CatsModule } from '../src/cats/module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cats', async () => {
    const response = await request(app.getHttpServer())
      .get('/cats')
      .expect(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toStrictEqual('Hello cats!');
  });

});
