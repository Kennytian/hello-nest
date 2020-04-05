import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MongoEntityManager } from 'typeorm';
import { CatEntity } from './cat.entity';
import { convertId2Instance, convertIdInObject } from '../utils/input-covert';

@Injectable()
export class CatsService {
  constructor(@InjectEntityManager() private readonly manager: MongoEntityManager) {}
  private readonly objectIdKeys = 'farm,user';

  hello(): string {
    return 'Hello cats!';
  }

  async create(createCatDto: CatEntity): Promise<CatEntity> {
    try {
      const result = await this.manager.create(CatEntity, createCatDto);
      console.log('create result===', result);
      return result;
    } catch (e) {
      console.error('CatsService-create-error:', e);
      return null;
    }
  }

  async findOne(id: string): Promise<CatEntity> {
    try {
      return await this.manager.findOne(CatEntity, {
        where: convertId2Instance(id),
        cache: true,
        order: { id: 'DESC' },
      });
    } catch (e) {
      console.error('CatsService-findOne-error:', e);
      return null;
    }
  }

  async deleteOne(id): Promise<boolean> {
    try {
      const data = await this.manager.deleteOne(CatEntity, convertId2Instance(id));
      return !!data?.deletedCount;
    } catch (e) {
      console.error('CatsService-deleteOne-error:', e);
      return false;
    }
  }

  async updateOne(input: CatEntity): Promise<boolean> {
    try {
      const { id, ...rest } = input;
      const data = await this.manager.updateOne(CatEntity, convertId2Instance(id), {
        $set: { ...convertIdInObject(rest, this.objectIdKeys), updateAt: new Date() },
      });
      return !!data?.result?.n;
    } catch (e) {
      console.error('CatsService-updateOne-error:', e);
      return false;
    }
  }

  async findAll(input: CatEntity): Promise<CatEntity[]> {
    const { pageIndex, pageSize, ...rest } = input;
    try {
      return this.manager.find(CatEntity, {
        where: convertIdInObject(rest, this.objectIdKeys),
        cache: true,
        order: { id: 'DESC' },
        skip: pageIndex ?? 0,
        take: pageSize ?? 20, // 默认只显示20条
      });
    } catch (e) {
      console.error('CatsService-findAll-error:', e);
      return null;
    }
  }
}
