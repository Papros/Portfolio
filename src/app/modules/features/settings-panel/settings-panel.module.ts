import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SettingsPanelComponent } from "./components";

@NgModule({
    declarations: [
        SettingsPanelComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SettingsPanelComponent
    ]
})
export class SettingsPanelModule {};