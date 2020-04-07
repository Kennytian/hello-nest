## GitHub OAuth App with Nest.js

### 一、Service
只做了读写文件的操作，生产上应该存 Redis 之类的服务里。

```javascript
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
```

### 二、Controller
- 用了 HttpService
- 用了 redirect
```javascript
async login(@Response() res) {
  res.redirect(this.redirectUrl);
}
```

- 调用 github 接口，要指定 `accept: 'application/json'`

- HttpService 请求结果要 toPromise() 一下

- 数组的链式属性判断：`const id = data?.[0]?.id;`

- httpService.patch 可以小幅度更新内容

- 不想返回内容，但又想结束请求，可使用` res.end()`

### 三、注册 HttpModule
```javascript
@Module({
  imports: [HttpModule],
  controllers: [GitHubOAuthAppController],
  providers: [GitHubOAuthAppService],
})
export class GitHubOAuthAppModule {}
```

### 四、更多代码
[https://github.com/Kennytian/hello-nest/tree/master/src/oauth](https://github.com/Kennytian/hello-nest/tree/master/src/oauth)
