import { NgModule } from "@angular/core";
import { TranslatePipe } from ".";
import { TRANSLATE_PIPE } from "./translation.module.types";

@NgModule({
    exports: [TranslatePipe],
    providers: [{
        provide: TRANSLATE_PIPE,
        useClass: TranslatePipe,
    }],
    declarations: [TranslatePipe],
})
export class TranslationModule {}
