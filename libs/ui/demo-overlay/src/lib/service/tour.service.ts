import { computed, ElementRef, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { TourStatus } from '../model/tour.enum';
import { TourConfig, TourStep, HintConfig } from '../model/tour.interface';
import { TourEvent } from '../model/tour.events';

export class PiprTourService {
  // -- State signals (read-only outside service) --
  readonly activeTour = signal<TourConfig | null>(null);
  readonly activeStep = signal<TourStep | null>(null);
  readonly tourStatus = signal<TourStatus>(TourStatus.IDLE);
  readonly currentIndex = signal<number>(0);
  readonly progress = computed(() =>
    this.activeTour()
      ? this.currentIndex() / this.activeTour()!.steps.length
      : 0,
  );
  readonly isActive = computed(() => this.tourStatus() === TourStatus.ACTIVE);

  // -- Lifecycle events --
  readonly events$: Observable<TourEvent> = new Observable<TourEvent>(); // tourStarted, stepChanged, etc.

  // -- Registration --
  registerStep(stepId: string, ref: ElementRef): void {
    throw new Error('Method not implemented.');
  }

  unregisterStep(stepId: string): void {
    throw new Error('Method not implemented.');
  }

  registerHint(config: HintConfig, ref: ElementRef): void {
    throw new Error('Method not implemented.');
  }

  unregisterHint(hintId: string): void {
    throw new Error('Method not implemented.');
  }

  // -- Tour control --
  startTour(tourId: string): void {
    throw new Error('Method not implemented.');
  }

  next(): void {
    throw new Error('Method not implemented.');
  }

  prev(): void {
    throw new Error('Method not implemented.');
  }

  skip(): void {
    throw new Error('Method not implemented.');
  }

  end(): void {
    throw new Error('Method not implemented.');
  }

  pause(): void {
    throw new Error('Method not implemented.');
  }

  resume(): void {
    throw new Error('Method not implemented.');
  }

  restartTour(tourId: string): void {
    throw new Error('Method not implemented.');
  } // clears seen, then starts

  goToStep(stepId: string): void {
    throw new Error('Method not implemented.');
  }

  // -- Hint control --
  triggerHint(hintId: string): void {
    throw new Error('Method not implemented.');
  } // manual trigger

  dismissHint(hintId: string): void {
    throw new Error('Method not implemented.');
  }

  resetHint(hintId: string): void {
    throw new Error('Method not implemented.');
  } // clear seen flag
}
