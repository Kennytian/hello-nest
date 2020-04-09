import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_OR_KEY, TOKEN_HEADER_NAME } from '../const/base';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(TOKEN_HEADER_NAME),
      ignoreExpiration: false,
      secretOrKey: SECRET_OR_KEY,
    });
  }

  // Don't remove this method
  validate(payload) {
    return payload;
  }
}
