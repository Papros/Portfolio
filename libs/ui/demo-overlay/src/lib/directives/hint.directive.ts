import {
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
} from '@angular/core';
import {
  TourTrigger,
  TourTriggerAction,
  HintDismissBehavior,
  TooltipPlacement,
  PulseVariant,
  SpotlightVariant,
} from '../model/tour.enum';
import { PiprTourService } from '../service/tour.service';
import { HintConfig } from '../model/tour.interface';

/**
 * Registers a DOM element as a lazy hint anchor.
 * The hint is shown according to the chosen `trigger` strategy and suppressed when a tour is active.
 *
 * Usage:
 *
 * ```html
 *  <section
 *   [piprHint]="'cv-section'"
 *   [trigger]="TourTrigger.ON_VIEWPORT_ENTRY"
 *   [triggerAction]="TourTriggerAction.START_AFTER_INVITE"
 *   inviteText="Want a quick walkthrough of the CV section?"
 *   title="Interactive CV"
 *   content="You can export this as a PDF."
 * ></section>
 * ```
 */
@Directive({ selector: '[piprHint]', standalone: true })
export class PiprHintDirective implements OnInit, OnDestroy {
  /** hintId — doubles as selector alias */
  readonly piprHint = input.required<string>();
  readonly trigger = input<TourTrigger>(TourTrigger.ON_VIEWPORT_ENTRY);
  readonly triggerAction = input<TourTriggerAction>(TourTriggerAction.START);
  readonly dismiss = input<HintDismissBehavior>(HintDismissBehavior.BOTH);
  readonly autoCloseMs = input<number | undefined>(undefined);
  readonly delayMs = input<number | undefined>(undefined);
  readonly idleMs = input<number | undefined>(undefined);
  readonly placement = input<TooltipPlacement>(TooltipPlacement.BOTTOM);
  readonly pulse = input<PulseVariant>(PulseVariant.SECONDARY);
  readonly spotlight = input<SpotlightVariant>(SpotlightVariant.SUBTLE);
  readonly persist = input<boolean>(true);
  readonly inviteText = input<string | undefined>(undefined);
  readonly title = input.required<string>();
  readonly content = input<string | undefined>(undefined);
  readonly template = input<TemplateRef<unknown> | undefined>(undefined);
  readonly component = input<Type<unknown> | undefined>(undefined);

  private readonly tourService = inject(PiprTourService);
  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);
  private readonly ngZone = inject(NgZone);

  private intersectionObserver?: IntersectionObserver;
  private delayTimer?: ReturnType<typeof setTimeout>;
  private idleTimer?: ReturnType<typeof setTimeout>;
  private idleResetListener?: () => void;

  ngOnInit(): void {
    const config: HintConfig = {
      hintId: this.piprHint(),
      trigger: this.trigger(),
      triggerAction: this.triggerAction(),
      dismiss: this.dismiss(),
      autoCloseMs: this.autoCloseMs(),
      delayMs: this.delayMs(),
      idleMs: this.idleMs(),
      placement: this.placement(),
      pulse: this.pulse(),
      spotlight: this.spotlight(),
      persist: this.persist(),
      inviteText: this.inviteText(),
      title: this.title(),
      content: this.content(),
      template: this.template(),
      component: this.component(), // dynamic component, highest priority
    };

    this.tourService.registerHint(this.piprHint(), this.elementRef, config);
    this.setupTrigger();
  }

  ngOnDestroy(): void {
    this.teardownTrigger();
    this.tourService.unregisterHint(this.piprHint());
  }

  // --- Trigger setup -------------------------------------------------------

  private setupTrigger(): void {
    switch (this.trigger()) {
      case TourTrigger.ON_VIEWPORT_ENTRY:
        this.setupIntersectionObserver();
        break;
      case TourTrigger.ON_HOVER:
        this.setupHoverTrigger();
        break;
      case TourTrigger.ON_DELAY:
        this.setupDelayTrigger();
        break;
      case TourTrigger.ON_IDLE:
        this.setupIdleTrigger();
        break;
      // MANUAL and ON_ROUTE_ACTIVATION are triggered programmatically
      case TourTrigger.MANUAL:
      case TourTrigger.ON_ROUTE_ACTIVATION:
        break;
    }
  }

  private teardownTrigger(): void {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = undefined;

    if (this.delayTimer !== undefined) {
      clearTimeout(this.delayTimer);
      this.delayTimer = undefined;
    }
    if (this.idleTimer !== undefined) {
      clearTimeout(this.idleTimer);
      this.idleTimer = undefined;
    }

    if (this.idleResetListener) {
      document.removeEventListener('mousemove', this.idleResetListener);
      document.removeEventListener('keydown', this.idleResetListener);
      document.removeEventListener('scroll', this.idleResetListener);
      this.idleResetListener = undefined;
    }
  }

  // --- Strategies ----------------------------------------------------------

  private setupIntersectionObserver(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.ngZone.run(() => this.activate());
            this.intersectionObserver?.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      this.intersectionObserver.observe(this.elementRef.nativeElement);
    });
  }

  private setupHoverTrigger(): void {
    this.ngZone.runOutsideAngular(() => {
      this.elementRef.nativeElement.addEventListener(
        'mouseenter',
        () => this.ngZone.run(() => this.activate()),
        { once: true },
      );
    });
  }

  private setupDelayTrigger(): void {
    this.delayTimer = setTimeout(() => this.activate(), this.delayMs() ?? 3000);
  }

  private setupIdleTrigger(): void {
    const ms = this.idleMs() ?? 5000;

    const resetIdle = (): void => {
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => this.activate(), ms);
    };

    this.idleResetListener = resetIdle;

    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', resetIdle);
      document.addEventListener('keydown', resetIdle);
      document.addEventListener('scroll', resetIdle);
    });

    resetIdle();
  }

  private activate(): void {
    this.tourService.triggerHint(this.piprHint());
  }
}
