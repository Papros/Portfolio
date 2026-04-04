import { Component } from '@angular/core';
import {
  OverlayMenuComponent,
  OverlayMenuOption,
} from '@papros-it/overlay-menu';

@Component({
  selector: 'docs-custom-spread-overlay-menu',
  standalone: true,
  imports: [OverlayMenuComponent],
  templateUrl: './custom-spread-overlay-menu.example.component.html',
  styleUrl: './custom-spread-overlay-menu.example.component.scss',
})
export class CustomSpreadOverlayMenuExampleComponent {
  options: OverlayMenuOption[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'bookmark', label: 'Bookmark', icon: 'bookmark' },
    { id: 'download', label: 'Download', icon: 'download' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
}
