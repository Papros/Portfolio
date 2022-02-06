import { ModuleWithProviders, NgModule } from "@angular/core";
import { LoggerService } from ".";
import { LOGGER_SERVICE } from "./logger.module.types";

@NgModule()
export class LoggerModule {
    public static forRoot(): ModuleWithProviders<LoggerModule> {
        return {
            ngModule: LoggerModule,
            providers: [{
                provide: LOGGER_SERVICE,
                useClass: LoggerService,
            }],
        };
    }
}