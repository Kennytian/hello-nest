import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './controller';
import { CatsService } from './service';
import { CatsModule } from './module';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    controller = app.get(CatsController);
  });

  describe('cats', () => {
    it('Hello', async () => {
      const result = await controller.hello();
      expect(result).toEqual('Hello cats!');
    });

    // it('返回数据列表', async () => {
    //   const result = await controller.findAll({});
    //   expect(result.length).toBeGreaterThanOrEqual(0);
    // });
    // it('创建对象数据', async () => {
    //   const result = await controller.create({
    //     name: 'Jom_test',
    //     age: 5.5,
    //     breed: 'unknown_test',
    //   });
    //   expect(result).toMatchObject({ name: 'Jom_test', age: 5.5, breed: 'unknown_test' });
    // });
  });
});
