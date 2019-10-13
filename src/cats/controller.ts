import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CatsService } from './service';
import { CreateCatDto } from './cat-dto';
import { CatDoc } from './interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  hello() {
    return this.catsService.hello();
  }

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get('find-all')
  findAll(@Query() query): Promise<CatDoc[]> {
    const { index = 0, size = 5 } = query;
    const limit = Number.parseInt(size, 10) || 5;
    let skip = (Number.parseInt(index, 10) || 0) - 1;
    if (skip < 0) {
      skip = 0;
    }
    skip = skip * limit;
    return this.catsService.findAll({ limit, skip });
  }
}
