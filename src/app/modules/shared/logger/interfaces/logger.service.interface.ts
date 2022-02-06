export interface ILoggerService {
    error(msg: any, prefix: string): void;
    warning(msg: any, prefix: string): void;
    info(msg: any, prefix: string): void;
    debug(msg: any, prefix: string): void;
}
