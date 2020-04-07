import { HttpModule, Module } from '@nestjs/common';
import { GitHubOAuthAppService } from './github-oauth-app.service';
import { GitHubOAuthAppController } from './github-oauth-app.controller';

@Module({
  imports: [HttpModule],
  controllers: [GitHubOAuthAppController],
  providers: [GitHubOAuthAppService],
})
export class GitHubOAuthAppModule {}
