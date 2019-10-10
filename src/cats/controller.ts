import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './service';
import { CreateCatDto } from './cat-dto';
import { CatDoc } from './interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get(['find*all'])
  findAll(): Promise<CatDoc[]> {
    return this.catsService.findAll();
  }
}
