import { ModuleWithProviders, NgModule } from "@angular/core";
import { CONFIG_SERVICE, ConfigService } from ".";

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