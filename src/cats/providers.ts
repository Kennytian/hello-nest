import { Connection } from 'mongoose';
import { CatSchema } from './schema';

export const CatsProviders = [
  {
    // provide: CAT_MODEL，用于跟 service 文件里构造函数 token 匹配
    provide: 'CAT_MODEL',
    // my_cat 表示 collection 名（表名）
    useFactory: (connection: Connection) => connection.model('my_cat', CatSchema),
    inject: ['DbConnectionToken'],
  },
];
