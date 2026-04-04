import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationAction } from './navigation-bat.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  @Input() actions: NavigationAction[] = [];
  @Input() isSticky = true;
  @Output() actionClick = new EventEmitter<string>();
}
