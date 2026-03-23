import { Component, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  OverlayMenuComponent,
  OverlayMenuOption,
  OverlayMenuState,
} from '@ui/overlay-menu';

@Component({
  selector: 'docs-external-state-overlay-menu',
  standalone: true,
  imports: [OverlayMenuComponent, MatButtonModule],
  templateUrl: './external-state-overlay-menu.example.component.html',
  styleUrl: './external-state-overlay-menu.example.component.scss',
})
export class ExternalStateOverlayMenuExampleComponent {
  menuState: WritableSignal<OverlayMenuState> = signal(OverlayMenuState.CLOSED);

  options: OverlayMenuOption[] = [
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { id: 'share', label: 'Share', icon: 'share' },
    { id: 'delete', label: 'Delete', icon: 'delete' },
  ];

  toggle() {
    this.menuState.update((s) =>
      s === OverlayMenuState.OPEN
        ? OverlayMenuState.CLOSED
        : OverlayMenuState.OPEN,
    );
  }
}
