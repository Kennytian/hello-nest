import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatDto, FindAllCatsDto } from './cat-dto';
import { CatDoc } from './interface';

@Injectable()
export class CatsService {
  // CAT_MODEL 表示 token，用于跟 providers 文件里的 provide 名称匹配
  constructor(@Inject('CAT_MODEL') private readonly catModel: Model<CatDoc>) {}

  hello(): string {
    return 'Hello cats!';
  }

  async create(createCatDto: CreateCatDto): Promise<CatDoc> {
    const createdCat = new this.catModel(createCatDto);
    const result = await createdCat.save();
    return result;
  }

  async findAll(param: FindAllCatsDto): Promise<CatDoc[]> {
    // console.log(param);
    return await this.catModel
      .find({})
      .limit(param.limit)
      .skip(param.skip)
      .exec();
  }
}
