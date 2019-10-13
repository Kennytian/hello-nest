// 用户录入进来的字段约束
export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

export class FindAllCatsDto {
  readonly skip: number;
  readonly limit: number;
}
