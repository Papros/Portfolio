import { ModuleWithProviders, NgModule } from "@angular/core";
import { ConfigService } from ".";
import { CONFIG_SERVICE } from "./config.module.types";

@NgModule()
export class ConfigModule {
    public static forRoot(): ModuleWithProviders<ConfigModule> {
        return {
            ngModule: ConfigModule,
            providers: [{
                provide: CONFIG_SERVICE,
                useClass: ConfigService,
            }],
        };
    }
}