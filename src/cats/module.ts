import { Module } from '@nestjs/common';
import { CatsController } from './controller';
import { CatsService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
