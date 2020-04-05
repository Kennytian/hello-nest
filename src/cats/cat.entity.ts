import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'my_cats' })
export class CatEntity extends BaseEntity {
  @Column({ comment: '猫名', default: '' })
  name: string;

  @Column({ comment: '猫龄', default: 1 })
  age: number;

  @Column({ comment: '猫品种', default: '' })
  breed: string;

  pageIndex?: number;

  pageSize?: number;
}
