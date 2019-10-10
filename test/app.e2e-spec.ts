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

  it('/cats/find-all (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/find_all')
      .expect(200)
      .expect(res => Array.isArray(res));
  });

  it('/cats/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats/create')
      .send({ name: 'Kenny', age: 36, breed: 'none' })
      .expect(201)
      .expect(res => res.body && res.body.name === 'Kenny');
  });
});
