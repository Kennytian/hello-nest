import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('权限 接口')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() input: UserEntity): Promise<any> {
    return this.service.login(input);
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() input: UserEntity): Promise<any> {
    return this.service.register(input);
  }

  @Post('token')
  @ApiOperation({ summary: '验证 Token' })
  async verifyToken(@Query('input') input: string) {
    const result = this.service.verifyToken(input);
    if (!result) {
      return { message: '验证失败', code: 500, data: null };
    }
    return { message: '验证成功', code: 0, data: result };
  }
}
