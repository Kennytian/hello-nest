import { Logger } from '@nestjs/common';

export class BizLogger extends Logger {
  error(message: any, trace?: string, context?: string) {
    console.log('BizLogger error==========', message, context);
    super.log(message, context);
  }

  warn(message: any, context?: string) {
    console.log('BizLogger warn==========', message, context);
    super.log(message, context);
  }
}
