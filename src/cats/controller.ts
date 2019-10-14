import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CatsService } from './service';
import { CreateCatDto, UpdateCatDto } from './cat-dto';
import { CatDoc } from './interface';

@Controller('cats')
@ApiUseTags('猫儿总类')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiOperation({ title: '打个招呼', description: '打招呼的描述' })
  hello() {
    return this.catsService.hello();
  }

  @Post('create')
  @ApiOperation({
    title: '创建一条猫儿的记录',
    description: '猫儿的记录的描述',
  })
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiOperation({
    title: '查询指定 ID 的猫儿记录',
    description: '指定 ID 猫儿记录的描述',
  })
  findOne(@Param('id') id: string): Promise<CatDoc> {
    if (!id) {
      return Promise.resolve({ name: '', age: 0, breed: '' });
    }
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    title: '删除指定 ID 的猫儿记录',
    description: '删除 ID 猫儿记录的描述',
  })
  deleteOne(@Param('id')  id: string): Promise<CatDoc> {
    if (!id) {
      return Promise.resolve({ name: '', age: 0, breed: '' });
    }
    return this.catsService.deleteOne(id);
  }

  @Put(':id')
  @ApiOperation({
    title: '更新指定 ID 的猫儿记录',
    description: '更新 ID 猫儿记录的描述',
  })
  updateOne(@Param('id')  id: string, @Body() body: UpdateCatDto): Promise<CatDoc> {
    if (!id) {
      return Promise.resolve({ name: '', age: 0, breed: '' });
    }
    return this.catsService.updateOne(id, body);
  }

  @Get('find-all')
  @ApiOperation({
    title: '查询所有猫儿的记录',
    description: '所有猫儿记录的描述',
  })
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
