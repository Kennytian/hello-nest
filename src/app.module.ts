import { Module } from '@nestjs/common';
import { CatsModule } from './cats/module';
import { DatabaseModule } from './shared/database.module';

@Module({
  imports: [DatabaseModule, CatsModule],
})
export class AppModule {}
