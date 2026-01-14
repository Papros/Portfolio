import { Component } from '@angular/core';
import { OverlayMenuComponent } from '@ui/overlay-menu';

@Component({
  selector: 'docs-default-overlay-menu',
  standalone: true,
  imports: [OverlayMenuComponent],
  templateUrl: './default-overlay-menu.example.component.html',
  styleUrl: './default-overlay-menu.example.component.scss',
})
export class DefaultOverlayMenuExampleComponent {}
