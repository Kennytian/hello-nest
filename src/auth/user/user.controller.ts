import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtGuard } from '../../shared/jwt.guard';
import { TEST_TOKEN, TOKEN_HEADER_NAME } from '../../const/base';
import { UserEntity } from '../user.entity';

@Controller('')
@ApiTags('用户')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('user/list')
  @ApiHeader({ name: TOKEN_HEADER_NAME, description: TEST_TOKEN })
  @ApiOperation({ summary: '用户列表' })
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  login(): Promise<Partial<UserEntity>[]> {
    return this.service.findAll();
  }
}
