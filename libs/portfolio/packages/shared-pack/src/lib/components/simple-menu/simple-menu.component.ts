import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleMenuAction } from './simple-menu.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-simple-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './simple-menu.component.html',
  styleUrl: './simple-menu.component.scss',
})
export class SimpleMenuComponent {
  @Input()
  actions: SimpleMenuAction[] = [];
}

export { SimpleMenuAction };
