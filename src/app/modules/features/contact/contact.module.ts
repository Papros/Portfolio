import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContactsInfoComponent } from "./components";

@NgModule({
    declarations: [
        ContactsInfoComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ContactsInfoComponent
    ]
})
export class ContactsInfoModule {};