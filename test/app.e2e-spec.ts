import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { CatsModule } from '../src/cats/module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CatsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/cats/find-all (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/find-all')
      .expect(200)
      .expect('This action result all cats');
  });

  it('/cats/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats/create')
      .expect(201)
      .expect('This action adds a new cat');
  });

  it('/cats/find-wildcard (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats/find-wildcard')
      .expect(201)
      .expect('This action result a wildcard');
  });
});
