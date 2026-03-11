import { Component } from '@angular/core';
import { OverlayMenuComponent, OverlayMenuOption } from '@ui/overlay-menu';

@Component({
  selector: 'docs-default-overlay-menu',
  standalone: true,
  imports: [OverlayMenuComponent],
  templateUrl: './default-overlay-menu.example.component.html',
  styleUrl: './default-overlay-menu.example.component.scss',
})
export class DefaultOverlayMenuExampleComponent {
  menuOption: OverlayMenuOption[] = [
    {
      id: 'option1',
      label: 'Option 1',
      icon: 'home',
    },
    {
      id: 'option2',
      label: 'Option 2',
      icon: 'settings',
    },
    {
      id: 'option3',
      label: 'Option 3',
      icon: 'info',
    },
  ];
}
