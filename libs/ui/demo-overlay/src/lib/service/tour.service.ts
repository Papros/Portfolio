import {
  computed,
  ElementRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HintStatus, TourStatus } from '../model/tour.enum';
import {
  TourConfig,
  TourStep,
  HintConfig,
  RegisteredStep,
  RegisteredHint,
} from '../model/tour.interface';
import { TourEvent } from '../model/tour.events';
import { PIPR_TOUR_NAVIGATION } from '../navigation/navigation.token';
import { PIPR_TOUR_STORAGE } from '../storage/tour-storage.token';
import { PIPR_TOUR_CONFIG } from '../config/tour.provider';

@Injectable({ providedIn: 'root' })
export class PiprTourService {
  private readonly config = inject(PIPR_TOUR_CONFIG);
  private readonly storage = inject(PIPR_TOUR_STORAGE);
  private readonly navigation = inject(PIPR_TOUR_NAVIGATION);

  // -- State signals (read-only outside service) --
  readonly activeTour = signal<TourConfig | null>(null);
  readonly activeStep = signal<TourStep | null>(null);
  readonly tourStatus = signal<TourStatus>(TourStatus.IDLE);
  readonly activeHintId = signal<string | null>(null);
  readonly currentIndex = signal<number>(0);

  readonly progress = computed(() => {
    const tour = this.activeTour();
    if (!tour || tour.steps.length === 0) return 0;
    return (this.currentIndex() + 1) / tour.steps.length;
  });

  readonly isActive = computed(() => this.tourStatus() === TourStatus.ACTIVE);

  // -- Lifecycle events --
  private readonly eventsSubject = new Subject<TourEvent>();
  readonly events$ = this.eventsSubject.asObservable(); // tourStarted, stepChanged, etc.

  private readonly registeredSteps = new Map<string, RegisteredStep>();
  private readonly registeredHints = new Map<string, RegisteredHint>();
  private readonly hintStatuses = new Map<string, HintStatus>();

  // -- Registration --
  registerStep(
    stepId: string,
    tourId: string,
    order: number,
    elementRef: { nativeElement: Element },
    config: Partial<TourStep>,
  ): void {
    this.registeredSteps.set(stepId, {
      stepId,
      tourId,
      order,
      elementRef,
      config,
    });
  }

  unregisterStep(stepId: string): void {
    this.registeredSteps.delete(stepId);

    // If active step is destroyed mid-tour, move forward gracefully
    if (this.activeStep()?.stepId === stepId && this.isActive()) {
      this.next();
    }
  }

  registerHint(
    hintId: string,
    elementRef: { nativeElement: Element },
    config: HintConfig,
  ): void {
    this.registeredHints.set(hintId, { hintId, elementRef, config });
    if (!this.hintStatuses.has(hintId)) {
      this.hintStatuses.set(hintId, HintStatus.PENDING);
    }
  }

  unregisterHint(hintId: string): void {
    this.registeredHints.delete(hintId);
    if (this.activeHintId() === hintId) {
      this.activeHintId.set(null);
    }
  }

  // -- Tour control --
  startTour(tourId: string): void {
    if (this.isActive()) return;

    const tour = this.resolveTourConfig(tourId);
    if (!tour) {
      console.warn(`[pipr-tour] Tour "${tourId}" not found.`);
      return;
    }

    if (tour.persist && this.storage.hasSeen(this.config.userId, tourId))
      return;

    const sorted: TourConfig = {
      ...tour,
      steps: [...tour.steps].sort((a, b) => a.order - b.order),
    };

    this.activeTour.set(sorted);
    this.currentIndex.set(0);
    this.tourStatus.set(TourStatus.ACTIVE);
    this.eventsSubject.next({ type: 'tourStarted', tourId });

    this.showStep(sorted.steps[0]);
  }

  async next(): Promise<void> {
    const tour = this.activeTour();
    if (!tour || !this.isActive()) return;

    const nextIndex = this.currentIndex() + 1;
    if (nextIndex >= tour.steps.length) {
      this.completeTour();
      return;
    }

    this.currentIndex.set(nextIndex);
    await this.showStep(tour.steps[nextIndex]);
  }

  async prev(): Promise<void> {
    const tour = this.activeTour();
    if (!tour || !this.isActive()) return;

    const prevIndex = this.currentIndex() - 1;
    if (prevIndex < 0) return;

    this.currentIndex.set(prevIndex);
    await this.showStep(tour.steps[prevIndex]);
  }

  skip(): void {
    const tour = this.activeTour();
    if (!tour) return;
    const stepId = this.activeStep()?.stepId ?? '';
    this.tourStatus.set(TourStatus.SKIPPED);
    this.eventsSubject.next({
      type: 'tourSkipped',
      tourId: tour.tourId,
      stepId,
    });
    this.resetTourState();
  }

  end(): void {
    this.completeTour();
  }

  pause(): void {
    if (!this.isActive()) return;
    this.tourStatus.set(TourStatus.PAUSED);
    this.eventsSubject.next({
      type: 'tourPaused',
      tourId: this.activeTour()!.tourId,
    });
  }

  resume(): void {
    if (this.tourStatus() !== TourStatus.PAUSED) return;
    this.tourStatus.set(TourStatus.ACTIVE);
    this.eventsSubject.next({
      type: 'tourResumed',
      tourId: this.activeTour()!.tourId,
    });
  }

  restartTour(tourId: string): void {
    if (this.isActive()) this.skip();
    this.storage.clearSeen(this.config.userId, tourId);
    this.startTour(tourId);
  } // clears seen, then starts

  async goToStep(stepId: string): Promise<void> {
    const tour = this.activeTour();
    if (!tour) return;
    const index = tour.steps.findIndex((s) => s.stepId === stepId);
    if (index === -1) return;
    this.currentIndex.set(index);
    await this.showStep(tour.steps[index]);
  }

  // -- Hint control --
  triggerHint(hintId: string): void {
    if (this.isActive()) return;

    console.log('Trigger hint: ', hintId);

    const hint = this.registeredHints.get(hintId);
    if (!hint) return;

    if (hint.config.persist && this.storage.hasSeen(this.config.userId, hintId))
      return;

    this.hintStatuses.set(hintId, HintStatus.VISIBLE);
    this.activeHintId.set(hintId);
    this.eventsSubject.next({ type: 'hintShown', hintId });
  } // manual trigger

  dismissHint(hintId: string): void {
    const hint = this.registeredHints.get(hintId);
    if (!hint) return;

    if (hint.config.persist) {
      this.storage.markSeen(this.config.userId, hintId);
    }

    this.hintStatuses.set(hintId, HintStatus.SEEN);
    if (this.activeHintId() === hintId) this.activeHintId.set(null);
    this.eventsSubject.next({ type: 'hintDismissed', hintId });
  }

  resetHint(hintId: string): void {
    this.storage.clearSeen(this.config.userId, hintId);
    this.hintStatuses.set(hintId, HintStatus.PENDING);
  } // clear seen flag

  resolveAnchorElement(host: Element, anchorSelector?: string): Element {
    if (!anchorSelector) return host;
    console.log('Resolve anchor: ', host.querySelector(anchorSelector));
    return host.querySelector(anchorSelector) ?? host;
  }

  // --- Accessors for overlay -----------------------------------------------

  getHintStatus(hintId: string): HintStatus {
    return this.hintStatuses.get(hintId) ?? HintStatus.PENDING;
  }

  getActiveHintConfig(): HintConfig | null {
    const id = this.activeHintId();
    if (!id) return null;

    console.log('config: ', this.registeredHints.get(id)?.config);
    return this.registeredHints.get(id)?.config ?? null;
  }

  getActiveHintElement(): Element | null {
    const id = this.activeHintId();
    if (!id) return null;
    const registered = this.registeredHints.get(id);
    if (!registered) return null;
    console.log('getActiveHint: anchor? => ', registered.config.anchorSelector);
    return this.resolveAnchorElement(
      registered.elementRef.nativeElement,
      registered.config.anchorSelector,
    );
  }

  getActiveStepElement(): Element | null {
    const step = this.activeStep();
    if (!step) return null;
    const registered = this.registeredSteps.get(step.stepId);
    if (!registered) return null;
    return this.resolveAnchorElement(
      registered.elementRef.nativeElement,
      step.anchorSelector,
    );
  }

  // --- Private helpers -----------------------------------------------------

  private async showStep(step: TourStep): Promise<void> {
    const tour = this.activeTour()!;

    if (step.route) {
      await this.navigation.navigate(step.route);
    }

    const effective = this.resolveStep(step, tour);
    this.activeStep.set(effective);

    this.eventsSubject.next({
      type: 'stepChanged',
      tourId: tour.tourId,
      stepId: step.stepId,
      index: this.currentIndex(),
    });

    if (effective.scrollIntoView) {
      const el = this.registeredSteps.get(step.stepId)?.elementRef
        .nativeElement;
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private resolveStep(step: TourStep, tour: TourConfig): TourStep {
    const d = this.config.defaults;
    return {
      ...step,
      pulse: step.pulse ?? tour.pulse ?? d.pulse,
      spotlight: step.spotlight ?? tour.spotlight ?? d.spotlight,
      placement: step.placement ?? d.placement,
    };
  }

  private completeTour(): void {
    const tour = this.activeTour();
    if (!tour) return;

    if (tour.persist) {
      this.storage.markSeen(this.config.userId, tour.tourId);
    }

    this.tourStatus.set(TourStatus.COMPLETED);
    this.eventsSubject.next({ type: 'tourCompleted', tourId: tour.tourId });
    this.resetTourState();
  }

  private resetTourState(): void {
    this.activeTour.set(null);
    this.activeStep.set(null);
    this.currentIndex.set(0);
    this.tourStatus.set(TourStatus.IDLE);
  }

  private resolveTourConfig(tourId: string): TourConfig | undefined {
    // Tours can be registered via providePiprTour() or dynamically via directives
    const fromConfig = this.config.tours?.find((t) => t.tourId === tourId);
    if (fromConfig) return fromConfig;

    // Build from registered steps (directive-driven registration)
    const steps = Array.from(this.registeredSteps.values())
      .filter((s) => s.tourId === tourId)
      .map(
        (s): TourStep => ({
          stepId: s.stepId,
          order: s.order,
          title: s.config.title ?? '',
          content: s.config.content,
          template: s.config.template,
          component: s.config.component,
          route: s.config.route,
          placement: s.config.placement ?? this.config.defaults.placement,
          pulse: s.config.pulse ?? this.config.defaults.pulse,
          spotlight: s.config.spotlight ?? this.config.defaults.spotlight,
          draggable: s.config.draggable ?? false,
          scrollIntoView: s.config.scrollIntoView ?? true,
          anchorSelector: s.config.anchorSelector,
        }),
      );

    if (steps.length === 0) return undefined;

    return {
      tourId,
      steps,
      spotlight: this.config.defaults.spotlight,
      pulse: this.config.defaults.pulse,
      persist: true,
      allowKeyboard: this.config.defaults.allowKeyboard,
      skipLabel: this.config.defaults.skipLabel,
      nextLabel: this.config.defaults.nextLabel,
      prevLabel: this.config.defaults.prevLabel,
      finishLabel: this.config.defaults.finishLabel,
      showProgress: this.config.defaults.showProgress,
    };
  }
}
