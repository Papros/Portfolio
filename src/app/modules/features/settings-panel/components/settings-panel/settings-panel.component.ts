import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-settings-panel',
    templateUrl: './settings-panel.component.html',
    styleUrls: ['./settings-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent implements OnInit {
    
    ngOnInit(): void {
    }
    
}