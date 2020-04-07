import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'fs';

@Injectable()
export class GitHubOAuthAppService {
  private tokenPath = `${process.cwd()}/token.txt`;

  readLocalToken() {
    if (!existsSync(this.tokenPath)) {
      return '';
    }
    return readFileSync(this.tokenPath).toString();
  }

  writeLocalToken(content) {
    writeFileSync(this.tokenPath, content);
  }
}
