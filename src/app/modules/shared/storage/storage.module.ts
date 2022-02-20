import { ModuleWithProviders, NgModule } from "@angular/core";
import { StorageService } from "./services/storage.service";
import { STORAGE_SERVICE } from "./storage.module.types";

@NgModule()
export class StorageModule {
    public static forRoot(): ModuleWithProviders<StorageModule> {
        return {
            ngModule: StorageModule,
            providers: [{
            provide: STORAGE_SERVICE,
            useClass: StorageService,
            }],
        };
    }
}