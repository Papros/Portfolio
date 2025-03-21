import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OverlayMenuOption, OverlayMenuState } from './overlay-menu.interface';

@Component({
  selector: 'lib-overlay-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './overlay-menu.component.html',
  styleUrl: './overlay-menu.component.scss',
})
export class OverlayMenuComponent implements OnInit, OnDestroy {
  @Input() menuState = new BehaviorSubject<OverlayMenuState>(
    OverlayMenuState.CLOSED
  );
  @Input() label = 'Menu';
  @Input() icon = 'donut_small';
  @Input() options: OverlayMenuOption[] = [];

  isMenuOpen = false;
  bulkSubscription$ = new Subscription();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const stateSub$ = this.menuState.subscribe({
      next: (state: OverlayMenuState) => {
        switch (state) {
          case OverlayMenuState.CLOSED:
            this.isMenuOpen = false;
            break;
          case OverlayMenuState.OPEN:
            this.isMenuOpen = true;
            break;
          case OverlayMenuState.TOGGLE:
            this.isMenuOpen = !this.isMenuOpen;
            break;
        }

        this.cdr.markForCheck();
      },
    });
    this.bulkSubscription$.add(stateSub$);
  }

  toggle() {
    this.menuState.next(OverlayMenuState.TOGGLE);
  }

  ngOnDestroy(): void {
    this.bulkSubscription$?.unsubscribe();
  }
}
