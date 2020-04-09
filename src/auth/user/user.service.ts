import { createHmac } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MongoEntityManager } from 'typeorm';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private readonly manager: MongoEntityManager) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.manager.findOne(UserEntity, { where: { email } });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const input = { ...user, password: createHmac('sha256', user.password).digest('hex') };
    return await this.manager.save(UserEntity, input);
  }


  findAll(): Promise<UserEntity[]> {
    return this.manager.find(UserEntity, {
      cache: true,
      order: { createAt: 'DESC' },
    });
  }
}
