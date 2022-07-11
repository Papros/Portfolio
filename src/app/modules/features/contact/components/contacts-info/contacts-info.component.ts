import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CONFIG_SERVICE, IConfigservice } from "@app/shared/config";

@Component({
    selector: 'app-contacts-info',
    templateUrl: './contacts-info.component.html',
    styleUrls: ['./contacts-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsInfoComponent implements OnInit {
    
    constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigservice,
    ){ }

    ngOnInit(): void {
    }
    
}