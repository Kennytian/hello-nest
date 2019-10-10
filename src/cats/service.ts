import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatDto } from './cat-dto';
import { CatDoc } from './interface';

@Injectable()
export class CatsService {
  // CAT_MODEL 表示 token，用于跟 providers 文件里的 provide 名称匹配
  constructor(@Inject('CAT_MODEL') private readonly catModel: Model<CatDoc>) {}

  async create(createCatDto: CreateCatDto): Promise<CatDoc> {
    const createdCat = new this.catModel(createCatDto);
    const result = await createdCat.save();
    return result;
  }

  async findAll(): Promise<CatDoc[]> {
    return await this.catModel.find().exec();
  }
}
