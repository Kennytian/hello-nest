# Hello Nest

#### JWT

`@nestjs/jwt` + `@nestjs/jwt` + `JwtGuard` + `UseGuards`

#### class-transformer

`@Exclude()` + `@UseInterceptors(ClassSerializerInterceptor)` + `@Transform((value) => value.toString(), { toPlainOnly: true })`

处理隐藏 password 字段，将 id（_bsontype）转换为字符串
