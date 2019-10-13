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
      .get('/cats/find-all')
      .expect(200)
      .expect(res => {
        const result = JSON.parse(res.text);
        return Array.isArray(result);
      });
  });

  it('/cats/find-all?index=1&size=3', () => {
    return request(app.getHttpServer())
      .get('/cats/find-all?index=1&size=3')
      .expect(200)
      .expect(res => {
        const result = JSON.parse(res.text);
        return result.length === 3;
      });
  });

  it('/cats/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats/create')
      .send({ name: 'Kenny_test', age: 36, breed: 'none_test' })
      .expect(201)
      .expect(res => res.body && res.body.name === 'Kenny_test');
  });
});
