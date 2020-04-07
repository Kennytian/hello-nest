import { Controller, Get, HttpService, Query, Response } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GitHubOAuthAppService } from './github-oauth-app.service';

@ApiTags('OAuth 接口')
@Controller('')
export class GitHubOAuthAppController {
  private readonly clientId = 'af658c8458f8e525保密'; // https://github.com/settings/developers
  private readonly clientSecret = '58b3148ebfe6a655b939fc195648662ec43b保密';
  private readonly redirectUrl = `https://github.com/login/oauth/authorize?client_id=af658c8458f8e525保密&scope=repo`;
  private readonly tokenUrl = `https://github.com/login/oauth/access_token`;
  private readonly commentUrl = 'https://api.github.com/repos/Kennytian/meiqia-react-native/issues/comments';
  private readonly userUrl = 'https://api.github.com/user';

  constructor(private readonly httpService: HttpService, private readonly oAuthService: GitHubOAuthAppService) {
    console.log('http://127.0.0.1:3004/oauth/github-oauth-app');
    console.log('http://127.0.0.1:3004/oauth/update-comment');
    console.log('http://127.0.0.1:3004/oauth/save-user-profile');
  }

  @Get('oauth/github-oauth-app')
  @ApiOperation({ summary: 'OAuth 登录' })
  async login(@Response() res) {
    console.log('login data========', res.data);
    res.redirect(this.redirectUrl);
  }

  @Get('oauth/save-user-profile')
  @ApiOperation({ summary: '保存 GitHub 用户信息至数据库' })
  async saveUserProfile(@Response() res) {
    const token = this.oAuthService.readLocalToken();
    if (!token) {
      await this.login(res);
    } else {
      try {
        const config = { headers: { authorization: `token ${token}` } };
        const { data } = await this.httpService.get(this.userUrl, config).toPromise();
        const result = await this.oAuthService.save(data);
        res.send({ code: 0, message: '', data: result });
      } catch (e) {
        res.send({ code: 500, message: e.message, data: null });
      }
    }
  }

  @Get('oauth/oauth-callback')
  @ApiOperation({ summary: 'OAuth 回调，无需手动调用' })
  async callback(@Query() { code }, @Response() res) {
    const body = { client_id: this.clientId, client_secret: this.clientSecret, code };
    const config = { headers: { accept: 'application/json' } };
    const { data } = await this.httpService.post(this.tokenUrl, body, config).toPromise();
    if (data) {
      const { access_token, error_description } = data;
      if (access_token) {
        this.oAuthService.writeLocalToken(access_token);
        res.send({ code: 0, message: `获取 Token 成功`, token: access_token });
      } else {
        this.oAuthService.writeLocalToken('');
        res.send({ code: 500, message: '获取 Token 失败，' + error_description ?? '请检查请求参数' });
      }
    } else {
      res.send({ code: 404, message: '获取 Token 失败，请确保能正常访问 github.com 站点' });
    }
  }

  @Get('oauth/update-comment')
  @ApiOperation({ summary: 'OAuth 简单示例' })
  async updateComment(@Response() res) {
    const token = this.oAuthService.readLocalToken();
    if (!token) {
      await this.login(res);
    } else {
      const { data } = await this.httpService.get(this.commentUrl).toPromise();
      const id = data?.[0]?.id;
      const body = data?.[0]?.body;
      if (id && body) {
        const url = `${this.commentUrl}/${id}`;
        const newBody = { body: body.replace('版本', '版本本') };
        const headers = { headers: { authorization: `token ${token}` } };
        try {
          const newComment = await this.httpService.patch(url, newBody, headers).toPromise();
          if (newComment) {
            res.send({ code: 0, message: '内容更新成功 ' + newComment?.data?.body ?? '。' });
          } else {
            res.send({ code: 500, message: '内容更新失败成功，请确保能正常访问 github.com 站点' });
          }
        } catch ({ message }) {
          if (message.indexOf('authorization') > -1) {
            await this.login(res);
            res.end();
          } else {
            res.send({ code: 404, message });
          }
        }
      }
    }
  }
}
