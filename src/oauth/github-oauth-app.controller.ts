import { Controller, Get, HttpService, Query, Response } from '@nestjs/common';
import { GitHubOAuthAppService } from './github-oauth-app.service';

@Controller('')
export class GitHubOAuthAppController {
  private readonly clientId = 'af658c8458f8e525保密'; // https://github.com/settings/developers
  private readonly clientSecret = '58b3148ebfe6a655b939fc195648662ec43b保密';
  private readonly redirectUrl = `https://github.com/login/oauth/authorize?client_id=af658c8458f8e525保密&scope=repo`;
  private readonly commentUrl = 'https://api.github.com/repos/Kennytian/meiqia-react-native/issues/comments';

  constructor(private readonly httpService: HttpService, private readonly oAuthService: GitHubOAuthAppService) {
    console.log('http://127.0.0.1:3004/oauth/github-oauth-app');
    console.log('http://127.0.0.1:3004/oauth/update-comment');
  }

  @Get('oauth/github-oauth-app')
  async login(@Response() res) {
    res.redirect(this.redirectUrl);
  }

  @Get('oauth/oauth-callback')
  async callback(@Query() { code }, @Response() res) {
    const url = `https://github.com/login/oauth/access_token`;
    const body = { client_id: this.clientId, client_secret: this.clientSecret, code };
    const config = { headers: { accept: 'application/json' } };
    const { data } = await this.httpService.post(url, body, config).toPromise();
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
            res.end()
          } else {
            res.send({ code: 404, message });
          }
        }
      }
    }
  }
}
