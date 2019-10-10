import { Document } from 'mongoose';

// 存放至「数据库」里的字段结构
export interface CatDoc extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
