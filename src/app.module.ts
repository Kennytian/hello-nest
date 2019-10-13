import { Module } from '@nestjs/common';
import { CatsModule } from './cats/module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
