// 用户录入进来的字段约束
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiModelProperty({ description: '猫儿名称' })
  readonly name: string;
  @ApiModelProperty({ description: '猫儿年龄' })
  readonly age: number;
  @ApiModelProperty({ description: '猫儿品种' })
  readonly breed: string;
}

export class UpdateCatDto {
  @ApiModelProperty({ description: '猫儿名称' })
  readonly name: string;
  @ApiModelProperty({ description: '猫儿年龄' })
  readonly age: number;
  @ApiModelProperty({ description: '猫儿品种' })
  readonly breed: string;
}

export class FindAllCatsDto {
  @ApiModelProperty({ description: '数据页索引' })
  readonly skip: number;
  @ApiModelProperty({ description: '数据页条数' })
  readonly limit: number;
}
