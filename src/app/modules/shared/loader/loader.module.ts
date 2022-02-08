import { ModuleWithProviders, NgModule } from "@angular/core";
import { LOADER_SERVICE } from "./loader.module.types";
import { LoaderService } from "./services";

@NgModule()
export class LoaderModule {
    public static forRoot(): ModuleWithProviders<LoaderModule> {
        return {
            ngModule: LoaderModule,
            providers: [{
                provide: LOADER_SERVICE,
                useClass: LoaderService,
            }],
        };
    }
}