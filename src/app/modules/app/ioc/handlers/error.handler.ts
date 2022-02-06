import { Inject, Injectable } from "@angular/core";
import { ErrorHandler as IErrorHandler } from "@angular/core";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";

@Injectable()
export class AppErrorHandler implements IErrorHandler {
    private readonly loggerPrefix = "Error Handler";

    public constructor(
        @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService
    ){}

    handleError(error: any): void {
        this.logger.error(error.message, this.loggerPrefix);
        throw error;
    }

}