import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './controller';
import { CatsService } from './service';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('cats', () => {
    it('should return "This action result all cats"', () => {
      expect(catsController.findAll()).toBe('This action result all cats');
    });

    it('should return "This action adds a new cat"', () => {
      expect(catsController.create()).toBe('This action adds a new cat');
    });

    it('should return "This action result a wildcard"', () => {
      expect(catsController.findWildcard()).toBe(
        'This action result a wildcard',
      );
    });
  });
});
