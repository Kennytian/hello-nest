import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MongoEntityManager } from 'typeorm';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { GitHubProfileEntity } from './github.profile.entity';

@Injectable()
export class GitHubOAuthAppService {
  private tokenPath = `${process.cwd()}/token.txt`;

  constructor(@InjectEntityManager() private readonly manager: MongoEntityManager) {}

  readLocalToken() {
    if (!existsSync(this.tokenPath)) {
      return '';
    }
    return readFileSync(this.tokenPath).toString();
  }

  writeLocalToken(content) {
    writeFileSync(this.tokenPath, content);
  }

  async save(input: GitHubProfileEntity) {
    const { login } = input;
    try {
      const [first] = await this.manager.find(GitHubProfileEntity, { login });
      if (first) {
        await this.manager.findOneAndReplace(GitHubProfileEntity, { login }, input, { upsert: true });
      } else {
        await this.manager.save(GitHubProfileEntity, input);
      }
      return input;
    } catch (e) {
      console.error('GitHubOAuthAppService-save-error:', e);
      throw e;
    }
  }
}
