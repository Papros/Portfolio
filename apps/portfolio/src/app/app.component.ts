import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [CommonModule, RouterModule],
    styleUrl: './app.component.scss'
})
export class AppComponent {}
