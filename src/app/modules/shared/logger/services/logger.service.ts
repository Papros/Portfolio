import { ILoggerService } from '../interfaces';
import moment from 'moment';

export class LoggerService implements ILoggerService {
  private level = '0';

  error (msg: any, prefix: string): void {
    console.error(this.format(msg,this.level,prefix));
  }

  warning (msg: any, prefix: string): void {
    console.warn(this.format(msg,this.level,prefix));
  }

  info (msg: any, prefix: string): void {
    console.info(this.format(msg,this.level,prefix));
  }

  debug (msg: any, prefix: string): void {
    console.debug(this.format(msg,this.level,prefix));
  }

  private format (msg: string, level: string, prefix: string): string {
    const date = moment().format('LTS');

    if (prefix) {
      return `:> ${ level } | ${ prefix } | ${ date } | ${ msg }`
    } else {
      return `:> ${ level } | ${ prefix } | ${ date } | ${ msg }`
    }
  }
}
