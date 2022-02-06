import { InjectionToken } from "@angular/core";
import { ILoggerService } from ".";

export const LOGGER_SERVICE = new InjectionToken<ILoggerService>('LOGGER_SERVICE');
