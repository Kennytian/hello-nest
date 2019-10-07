import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('find-all')
  findAll(): string {
    return this.catsService.findAll();
  }

  @Post('create')
  create(): string {
    return this.catsService.create();
  }

  @Post('f*d')
  findWildcard(): string {
    return this.catsService.findWildcard();
  }
}
