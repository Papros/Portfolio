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
      label: 'Option 1',
      icon: 'home',
      callback: () => console.log('Option 1 clicked'),
    },
    {
      label: 'Option 2',
      icon: 'settings',
      callback: () => console.log('Option 2 clicked'),
    },
    {
      label: 'Option 3',
      icon: 'info',
      callback: () => console.log('Option 3 clicked'),
    },
  ];
}
