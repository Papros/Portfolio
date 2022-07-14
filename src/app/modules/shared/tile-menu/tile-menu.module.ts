import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SettingsPanelModule } from "@app/features/settingpanel";
import { TileMenuComponent, TileMenuItemComponent } from ".";
import { ContactsInfoModule } from "@app/features/contact";

@NgModule({
    imports: [
        CommonModule,
        SettingsPanelModule,
        ContactsInfoModule,
    ],
    exports: [
        TileMenuComponent,
        TileMenuItemComponent,
    ],
    declarations: [
        TileMenuComponent,
        TileMenuItemComponent,
    ],
})
export class TileMenuModule {}
