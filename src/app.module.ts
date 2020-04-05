import { Module } from '@nestjs/common';
import { CatsModule } from './cats/module';
import { DatabaseModule } from './shared/database.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, CatsModule],
  controllers: [AppController],
})
export class AppModule {}
