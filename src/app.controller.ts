import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('欢迎接口')
export class AppController {
  @Get()
  @ApiOperation({ summary: '你好', description: '欢迎使用Nest.js' })
  hello() {
    return 'Hello Nest.js';
  }
}
