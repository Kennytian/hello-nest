import { CreateDateColumn, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

export class BaseEntity {
  @ObjectIdColumn({ name: '_id' })
  @Transform((value) => value.toString(), { toPlainOnly: true })
  id?: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
