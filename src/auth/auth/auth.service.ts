import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly service: UserService, private readonly jwt: JwtService) {}

  private async validate(input: UserEntity) {
    return await this.service.findByEmail(input.email);
  }

  async login(input: UserEntity): Promise<any | { status: number }> {
    const user = await this.validate(input);
    if (!user) {
      return { status: 404, message: '登录失败，未找到用户' };
    }

    const payload = `${user.name}|${user.id}`;
    const accessToken = this.jwt.sign(payload);

    return {
      expires_in: 3600,
      access_token: accessToken,
      user_id: payload,
      status: 200,
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwt.verify(token);
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  async register(input: UserEntity): Promise<any> {
    return this.service.create(input);
  }
}
