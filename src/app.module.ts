import { Module } from '@nestjs/common';
import { CatsModule } from './cats/module';
import { DatabaseModule } from './shared/database.module';
import { AppController } from './app.controller';
import { GitHubOAuthAppModule } from './oauth/github-oauth-app.module';

@Module({
  imports: [DatabaseModule, CatsModule, GitHubOAuthAppModule],
  controllers: [AppController],
})
export class AppModule {}
