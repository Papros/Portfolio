import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CONFIG_SERVICE, IConfigservice, PersonalData } from "@app/shared/config";
import { Observable, pluck, Subscription } from "rxjs";

@Component({
    selector: 'app-contacts-info',
    templateUrl: './contacts-info.component.html',
    styleUrls: ['./contacts-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsInfoComponent {
    public personalData$: Observable<PersonalData>;

    constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigservice,
    ){ 
        this.personalData$ = this.configService.Config$.pipe(pluck('personalData'));
    }
    
}