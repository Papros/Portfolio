import {
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OverlayMenuOption, OverlayMenuState } from './overlay-menu.interface';

@Component({
  selector: 'lib-overlay-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './overlay-menu.component.html',
  styleUrl: './overlay-menu.component.scss',
})
export class OverlayMenuComponent {
  @Input() options: OverlayMenuOption[] = [];
  @Input() radius = 120;
  @Input() spread = 160;
  @Input() stateSignal: WritableSignal<OverlayMenuState> | null = null;

  @Output() optionSelected = new EventEmitter<OverlayMenuOption>();

  private readonly _isOpen = signal(false);

  readonly isMenuOpen = computed(() => {
    const external = this.stateSignal;
    return external !== null
      ? external() === OverlayMenuState.OPEN
      : this._isOpen();
  });

  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private destroyRef: DestroyRef) {
    this.destroyRef.onDestroy(() => this.clearHideTimeout());
  }

  toggle(): void {
    if (this.stateSignal !== null) {
      this.stateSignal.update((s) =>
        s === OverlayMenuState.OPEN
          ? OverlayMenuState.CLOSED
          : OverlayMenuState.OPEN,
      );
    } else {
      this._isOpen.update((v) => !v);
    }
  }

  onMouseEnter(): void {
    this.clearHideTimeout();
    if (this.stateSignal !== null) {
      this.stateSignal.set(OverlayMenuState.OPEN);
    } else {
      this._isOpen.set(true);
    }
  }

  onMouseLeave(): void {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => {
      if (this.stateSignal !== null) {
        this.stateSignal.set(OverlayMenuState.CLOSED);
      } else {
        this._isOpen.set(false);
      }
    }, 1500);
  }

  selectOption(option: OverlayMenuOption): void {
    this.optionSelected.emit(option);
  }

  private clearHideTimeout(): void {
    if (this.hideTimeout !== null) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
