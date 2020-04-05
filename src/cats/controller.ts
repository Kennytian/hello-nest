import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatsService } from './service';
import { CatEntity } from './cat.entity';

@Controller('cats')
@ApiTags('猫儿总类')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiOperation({ summary: '打个招呼', description: '打招呼的描述' })
  hello() {
    return this.catsService.hello();
  }

  @Post('create')
  @ApiOperation({
    summary: '创建一条猫儿的记录',
    description: '猫儿的记录的描述',
  })
  async create(@Body() createCatDto: CatEntity) {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: '查询指定 ID 的猫儿记录',
    description: '指定 ID 猫儿记录的描述',
  })
  findOne(@Param('id') id: string): Promise<CatEntity> {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除指定 ID 的猫儿记录',
    description: '删除 ID 猫儿记录的描述',
  })
  deleteOne(@Param('id') id: string): Promise<boolean> {
    return this.catsService.deleteOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: '更新指定 ID 的猫儿记录',
    description: '更新 ID 猫儿记录的描述',
  })
  updateOne(@Body() input: CatEntity): Promise<boolean> {
    return this.catsService.updateOne(input);
  }

  @Get('find-all')
  @ApiOperation({
    summary: '查询所有猫儿的记录',
    description: '所有猫儿记录的描述',
  })
  findAll(@Body() input: CatEntity): Promise<CatEntity[]> {
    return this.catsService.findAll(input);
  }
}
