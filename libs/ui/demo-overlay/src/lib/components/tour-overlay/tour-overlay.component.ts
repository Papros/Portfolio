import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiprTourService } from '../../service/tour.service';
import {
  SpotlightVariant,
  PulseVariant,
  TourTriggerAction,
  HintDismissBehavior,
  TooltipPlacement,
} from '../../model/tour.enum';
import { HintConfig, TourStep } from '../../model/tour.interface';
import { TourProgressComponent } from '../tour-progress/tour-progress.component';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}
interface TooltipPosition {
  top: number;
  left: number;
}

const TOOLTIP_OFFSET = 12;
const TOOLTIP_MARGIN = 120;

@Component({
  selector: 'pipr-tour-overlay',
  imports: [CommonModule, TourProgressComponent],
  templateUrl: './tour-overlay.component.html',
  styleUrl: './tour-overlay.component.scss',
})
export class TourOverlayComponent implements AfterViewInit, OnDestroy {
  readonly tourService = inject(PiprTourService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);

  // enums to template ref
  readonly SpotlightVariant = SpotlightVariant;
  readonly PulseVariant = PulseVariant;
  readonly TourTriggerAction = TourTriggerAction;
  readonly HintDismissBehavior = HintDismissBehavior;

  readonly activeTour = this.tourService.activeTour;
  readonly activeStep = this.tourService.activeStep;
  readonly activeHintId = this.tourService.activeHintId;
  readonly isActive = this.tourService.isActive;
  readonly progress = this.tourService.progress;
  readonly currentIndex = this.tourService.currentIndex;
  readonly activeHintConfig = computed(() =>
    this.tourService.getActiveHintConfig(),
  );

  // Positioning
  readonly tooltipPos = signal<TooltipPosition>({ top: -9999, left: -9999 });
  readonly anchorRect = signal<Rect | null>(null);
  readonly pulseRect = signal<Rect | null>(null);
  readonly effectivePlacement = signal<TooltipPlacement>(
    TooltipPlacement.BOTTOM,
  );
  readonly tooltipVisible = signal<boolean>(false);
  readonly showInvite = signal<boolean>(false);
  readonly isDragging = signal<boolean>(false);

  private dragOffset = { x: 0, y: 0 };
  private resizeObserver?: ResizeObserver;
  private cleanupKeyboard?: () => void;

  constructor() {
    console.log('Creating overlay: ');
    effect(() => {
      const step = this.activeStep();
      console.log('Effect for step: ', step?.stepId);
      if (step) {
        untracked(() => this.onStepChange(step));
      } else {
        this.tooltipVisible.set(false);
        this.anchorRect.set(null);
        this.pulseRect.set(null);
      }

      untracked(() => {
        console.log('isActive: ', this.isActive());
        console.log('activeStep: ', step);
        console.log('tooltipVisible: ', this.tooltipVisible());
        console.log('anchorRect: ', this.anchorRect());
      });
    });

    effect(() => {
      const hint = this.activeHintConfig();
      if (hint) {
        untracked(() => this.onHintChange(hint));
      } else {
        this.tooltipVisible.set(false);
        this.showInvite.set(false);
        this.anchorRect.set(null);
        this.pulseRect.set(null);
      }
    });
  }

  ngAfterViewInit(): void {
    this.setupKeyboardListener();
  }

  ngOnDestroy(): void {
    console.log('Clear overlay');
    this.resizeObserver?.disconnect();
    this.cleanupKeyboard?.();
    window.removeEventListener('scroll', this.onScrollResize);
    window.removeEventListener('resize', this.onScrollResize);
  }

  // Helpers

  private onStepChange(step: TourStep): void {
    console.log('stepchange: ', step.stepId);
    const el = this.tourService.getActiveStepElement();
    console.log('onStepChange: EL: ', el);
    const pulseEl = step.pulseSelector
      ? this.tourService.getActiveStepPulseElement()
      : undefined;
    this.updatePosition(
      el,
      step.placement,
      step.draggable,
      pulseEl ?? undefined,
    );
    this.setupResizeObserver(el);
    this.tooltipVisible.set(true);
    this.cdr.markForCheck();
  }

  private onHintChange(config: HintConfig): void {
    const el = this.tourService.getActiveHintElement();

    const pulseEl =
      (config.pulseSelector
        ? this.tourService.getActiveHintPulseElement()
        : undefined) ?? undefined;

    if (
      config.triggerAction === TourTriggerAction.START_AFTER_INVITE &&
      !this.showInvite()
    ) {
      this.showInvite.set(true);
      this.updatePosition(el, config.placement, config.draggable, pulseEl);
      this.setupResizeObserver(el);
      this.cdr.markForCheck();
      return;
    }

    this.showInvite.set(false);
    this.updatePosition(el, config.placement, config.draggable, pulseEl);
    this.setupResizeObserver(el);
    this.tooltipVisible.set(true);
    this.cdr.markForCheck();
  }

  // Position helpers

  private updatePosition(
    el: Element | null,
    requested: TooltipPlacement,
    draggable: boolean,
    pulseEl?: Element,
  ): void {
    if (!el || (draggable && this.isDragging())) return;

    const rect = el.getBoundingClientRect();
    this.anchorRect.set({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    const pulseRect = pulseEl?.getBoundingClientRect() ?? rect;
    this.pulseRect.set({
      top: pulseRect.top,
      left: pulseRect.left,
      width: pulseRect.width,
      height: pulseRect.height,
    });

    const placement =
      requested === TooltipPlacement.AUTO
        ? this.autoPlacement(rect)
        : requested;
    this.effectivePlacement.set(placement);
    this.tooltipPos.set(this.calcTooltipPos(rect, placement));
  }

  private autoPlacement(rect: DOMRect): TooltipPlacement {
    const vh = window.innerHeight,
      vw = window.innerWidth;
    if (vh - rect.bottom >= 200) return TooltipPlacement.BOTTOM;
    if (rect.top >= 200) return TooltipPlacement.TOP;
    if (vw - rect.right >= 280) return TooltipPlacement.RIGHT;
    if (rect.left >= 280) return TooltipPlacement.LEFT;
    return TooltipPlacement.BOTTOM;
  }

  private calcTooltipPos(
    rect: DOMRect,
    placement: TooltipPlacement,
  ): TooltipPosition {
    const vw = window.innerWidth,
      vh = window.innerHeight;
    let top = 0,
      left = 0;

    switch (placement) {
      case TooltipPlacement.BOTTOM:
        top = rect.bottom + TOOLTIP_OFFSET;
        left = rect.left + rect.width / 2;
        break;
      case TooltipPlacement.TOP:
        top = rect.top - TOOLTIP_OFFSET;
        left = rect.left + rect.width / 2;
        break;
      case TooltipPlacement.RIGHT:
        top = rect.top + rect.height / 2;
        left = rect.right + TOOLTIP_OFFSET;
        break;
      case TooltipPlacement.LEFT:
        top = rect.top + rect.height / 2;
        left = rect.left - TOOLTIP_OFFSET;
        break;
    }

    return {
      top: Math.max(TOOLTIP_MARGIN, Math.min(vh - TOOLTIP_MARGIN, top)),
      left: Math.max(TOOLTIP_MARGIN, Math.min(vw - TOOLTIP_MARGIN, left)),
    };
  }

  // Resize

  private setupResizeObserver(el: Element | null): void {
    this.resizeObserver?.disconnect();
    if (!el) return;

    this.ngZone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() =>
        this.ngZone.run(() => this.reflow()),
      );
      this.resizeObserver.observe(el);
      window.addEventListener('scroll', this.onScrollResize, {
        passive: true,
        capture: true,
      });
      window.addEventListener('resize', this.onScrollResize, { passive: true });
    });
  }

  private reflow(): void {
    const step = this.activeStep();
    const hint = this.activeHintConfig();
    const el = step
      ? this.tourService.getActiveStepElement()
      : this.tourService.getActiveHintElement();

    const pulseEl = step
      ? this.tourService.getActiveStepPulseElement()
      : this.tourService.getActiveHintPulseElement();

    const placement =
      step?.placement ?? hint?.placement ?? TooltipPlacement.BOTTOM;
    this.updatePosition(
      el,
      placement,
      step?.draggable ?? false,
      pulseEl ?? undefined,
    );
    this.cdr.markForCheck();
  }

  private readonly onScrollResize = (): void =>
    this.ngZone.run(() => this.reflow());

  // Keyboard

  private setupKeyboardListener(): void {
    const handler = (e: KeyboardEvent): void => {
      if (!this.activeTour()?.allowKeyboard || !this.isActive()) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        this.tourService.skip();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.tourService.next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.tourService.prev();
      }
    };
    document.addEventListener('keydown', handler);
    this.cleanupKeyboard = () =>
      document.removeEventListener('keydown', handler);
  }

  // Drag&Drop

  onDragStart(e: MouseEvent): void {
    if (!this.activeStep()?.draggable && !this.activeHintConfig()?.draggable) {
      return;
    }

    this.isDragging.set(true);
    this.dragOffset = {
      x: e.clientX - this.tooltipPos().left,
      y: e.clientY - this.tooltipPos().top,
    };

    const onMove = (ev: MouseEvent): void => {
      this.tooltipPos.set({
        left: ev.clientX - this.dragOffset.x,
        top: ev.clientY - this.dragOffset.y,
      });
      this.cdr.markForCheck();
    };
    const onUp = (): void => {
      this.isDragging.set(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  // Invite

  onInviteAccept(): void {
    this.showInvite.set(false);
    this.tooltipVisible.set(true);
    this.cdr.markForCheck();
  }

  onInviteDismiss(): void {
    const id = this.activeHintId();
    if (id) {
      this.showInvite.set(false);
      this.tourService.dismissHint(id);
    }
  }

  // template

  get totalSteps(): number {
    return this.activeTour()?.steps.length ?? 0;
  }
  get isFirstStep(): boolean {
    return this.currentIndex() === 0;
  }
  get isLastStep(): boolean {
    return this.currentIndex() === this.totalSteps - 1;
  }

  get activeStepNextLabel(): string {
    const t = this.activeTour();
    return this.isLastStep
      ? (t?.finishLabel ?? 'Finish')
      : (t?.nextLabel ?? 'Next');
  }

  onDismissHint(): void {
    const id = this.activeHintId();
    if (id) this.tourService.dismissHint(id);
  }

  onDismissHintClickOutside(): void {
    const cfg = this.activeHintConfig();
    if (!cfg) return;
    if (
      cfg.dismiss === HintDismissBehavior.ON_CLICK_OUTSIDE ||
      cfg.dismiss === HintDismissBehavior.BOTH
    ) {
      this.onDismissHint();
    }
  }
}
