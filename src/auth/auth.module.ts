import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { JwtStrategy } from './jwt.strategy';
import { SECRET_OR_KEY } from '../const/base';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: SECRET_OR_KEY,
      // signOptions: {
      //   expiresIn: '30d',
      // },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController, UserController],
})
export class AuthModule {}
