import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'my_cats' })
export class CatEntity extends BaseEntity {
  @ApiProperty({ description: '猫名' })
  @Column({ comment: '猫名', default: '' })
  name: string;

  @ApiProperty({ description: '猫龄' })
  @Column({ comment: '猫龄', default: 1 })
  age: number;

  @ApiProperty({ description: '猫品种' })
  @Column({ comment: '猫品种', default: '' })
  breed: string;
}

export class CatUpdateInput {
  @ApiProperty({ description: 'id' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: '猫名' })
  @IsString()
  name: string;

  @ApiProperty({ description: '猫龄' })
  @IsNumber()
  age: number;

  @ApiProperty({ description: '猫品种', nullable: true })
  @IsString()
  breed: string;

  pageIndex?: number;

  pageSize?: number;
}
