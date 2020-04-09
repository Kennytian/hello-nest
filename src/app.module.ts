import { Module } from '@nestjs/common';
import { CatsModule } from './cats/module';
import { DatabaseModule } from './shared/database.module';
import { AppController } from './app.controller';
import { GitHubOAuthAppModule } from './oauth/github-oauth-app.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, CatsModule, GitHubOAuthAppModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
