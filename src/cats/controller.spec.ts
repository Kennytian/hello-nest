import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './controller';
import { CatsService } from './service';
import { CatsProviders } from './providers';
import { DatabaseModule } from '../database/module';
// import { CatsModule } from './module';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CatsController],
      providers: [CatsService, ...CatsProviders],
      // imports: [CatsModule],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('cats', () => {
    it('返回数据列表', async () => {
      const result = await catsController.findAll();
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('创建对象数据', async () => {
      const result = await catsController.create({
        name: 'Jom',
        age: 5.5,
        breed: 'unknown',
      });
      expect(result).toMatchObject({ name: 'Jom', age: 5.5, breed: 'unknown' });
    });
  });
});
