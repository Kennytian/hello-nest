import { CreateDateColumn, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @ObjectIdColumn({ name: '_id' })
  id?: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
