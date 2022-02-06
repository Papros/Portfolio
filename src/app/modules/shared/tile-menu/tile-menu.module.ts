import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TileMenuComponent, TileMenuItemComponent } from ".";

@NgModule({
    imports: [
        CommonModule,
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
