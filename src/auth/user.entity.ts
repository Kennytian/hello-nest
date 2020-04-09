import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'demousers' })
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: '姓名' })
  @Column()
  name: string;

  @ApiProperty({ description: '头像' })
  @Column({ default: '' })
  avatar: string;

  @ApiProperty({ description: '邮箱' })
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
