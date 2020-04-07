import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MongoEntityManager } from 'typeorm';
import { BaseResp } from '../base/base.resp';
import { convertId2Instance, convertIdInObject } from '../utils/input-covert';
import { CatEntity, CatUpdateInput } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectEntityManager() private readonly manager: MongoEntityManager) {}
  private readonly objectIdKeys = 'farm,user';

  hello(): string {
    return 'Hello cats!';
  }

  async save(input: CatEntity): Promise<BaseResp> {
    try {
      const data = await this.manager.save(CatEntity, input);
      console.log('create data===', data);
      return { message: '', code: 0, data: !!data };
    } catch (e) {
      console.error('CatsService-create-error:', e);
      return { message: e.message, code: 500, data: false };
    }
  }

  async findOne(id: string): Promise<BaseResp> {
    if (!id) {
      return { message: 'id 不能为空', code: 500, data: false };
    }
    try {
      const data = await this.manager.findOne(CatEntity, {
        where: convertId2Instance(id),
        cache: true,
        order: { id: 'DESC' },
      });
      return { message: '', code: 0, data };
    } catch (e) {
      console.error('CatsService-findOne-error:', e);
      return { message: e.message, code: 500, data: false };
    }
  }

  async deleteOne(id): Promise<BaseResp> {
    if (!id) {
      return { message: 'id 不能为空', code: 500, data: false };
    }
    try {
      const data = await this.manager.deleteOne(CatEntity, convertId2Instance(id));
      return { message: '', code: 0, data: !!data?.deletedCount };
    } catch (e) {
      console.error('CatsService-deleteOne-error:', e);
      return { message: e.message, code: 500, data: false };
    }
  }

  async updateOne(input: CatUpdateInput): Promise<BaseResp> {
    try {
      const { id, ...rest } = input;
      if (!id) {
        return { message: 'id 不能为空', code: 500, data: false };
      }
      const data = await this.manager.updateOne(CatEntity, convertId2Instance(id), {
        $set: { ...convertIdInObject(rest, this.objectIdKeys), updateAt: new Date() },
      });
      return { message: '', code: 0, data: !!data?.result?.n };
    } catch (e) {
      console.error('CatsService-updateOne-error:', e);
      return { message: e.message, code: 500, data: false };
    }
  }

  async findAll(): Promise<BaseResp> {
    try {
      const data = await this.manager.find(CatEntity);
      return { message: '', code: 0, data };
    } catch (e) {
      console.error('CatsService-findAll-error:', e);
      return { message: e.message, code: 500, data: null };
    }
  }
}
