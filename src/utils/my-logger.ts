import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  error(message: any, trace?: string, context?: string): any {
    console.error('MyLogger error==========', message, trace, context);
  }

  log(message: any, context?: string): any {
    // console.log('MyLogger log==========', message, context);
  }

  warn(message: any, context?: string): any {
    console.warn('MyLogger warn==========', message, context);
  }
}
