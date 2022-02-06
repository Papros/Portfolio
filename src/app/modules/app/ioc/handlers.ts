import { ErrorHandler, Provider } from "@angular/core";
import { AppErrorHandler } from "./handlers/error.handler";

export const HANDLERS: Provider[] = [{
    provide: ErrorHandler,
    useClass: AppErrorHandler,
}]