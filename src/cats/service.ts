import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  create(): string {
    return 'This action adds a new cat';
  }
  findAll(): string {
    return 'This action result all cats';
  }
  findWildcard(): string {
    return 'This action result a wildcard';
  }
}
