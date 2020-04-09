import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TEST_TOKEN } from '../const/base';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    // TODO: 读 redis 或 挫的本地文件
    const jwtStr = TEST_TOKEN;
    if (token !== jwtStr) {
      throw new ForbiddenException('Token 失效，请重新登录');
    }

    return true;
  }
}
