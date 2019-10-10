import { Module } from '@nestjs/common';
import { CatsController } from './controller';
import { CatsService } from './service';
import { DatabaseModule } from '../database/module';
import { CatsProviders } from './providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...CatsProviders],
})
export class CatsModule {}
