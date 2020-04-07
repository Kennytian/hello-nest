import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GitHubOAuthAppService } from './github-oauth-app.service';
import { GitHubOAuthAppController } from './github-oauth-app.controller';
import { GitHubProfileEntity } from './github.profile.entity';

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([GitHubProfileEntity])],
  controllers: [GitHubOAuthAppController],
  providers: [GitHubOAuthAppService],
})
export class GitHubOAuthAppModule {}
