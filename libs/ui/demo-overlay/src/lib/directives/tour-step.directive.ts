import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
} from '@angular/core';
import {
  TooltipPlacement,
  PulseVariant,
  SpotlightVariant,
} from '../model/tour.enum';
import { PiprTourService } from '../service/tour.service';

@Directive({ selector: '[piprTourStep]', standalone: true })
export class PiprTourStepDirective implements OnInit, OnDestroy {
  readonly piprTourStep = input.required<string>();
  readonly tourId = input.required<string>();
  readonly order = input<number>(0);
  readonly title = input.required<string>();

  readonly content = input<string | undefined>(undefined);
  readonly template = input<TemplateRef<unknown> | undefined>(undefined);
  readonly component = input<Type<unknown> | undefined>(undefined);
  readonly anchorSelector = input<string | undefined>(undefined);
  readonly pulseSelector = input<string | undefined>(undefined);
  readonly anchorId = input<string | undefined>(undefined);

  readonly placement = input<TooltipPlacement | undefined>(undefined);
  readonly pulse = input<PulseVariant | undefined>(undefined);
  readonly spotlight = input<SpotlightVariant | undefined>(undefined);
  readonly route = input<string | undefined>(undefined);
  readonly draggable = input<boolean>(true);
  readonly scrollIntoView = input<boolean>(true);

  readonly setup = input<(() => void) | undefined>(undefined)
  readonly cleanup = input<(() => void) | undefined>(undefined)

  private readonly tourService = inject(PiprTourService);
  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  ngOnInit(): void {
    this.tourService.registerStep(
      this.piprTourStep(),
      this.tourId(),
      this.order(),
      this.elementRef,
      {
        title: this.title(),
        content: this.content(),
        template: this.template(),
        component: this.component(),
        placement: this.placement(),
        pulse: this.pulse(),
        spotlight: this.spotlight(),
        route: this.route(),
        draggable: this.draggable(),
        scrollIntoView: this.scrollIntoView(),
        anchorSelector: this.anchorSelector(),
        pulseSelector: this.pulseSelector(),
        anchorId: this.anchorId(),
        setup: this.setup(),
        cleanup: this.cleanup()
      },
    );

    if(this.setup() || this.cleanup()) {
      console.log('SETUP | CELANUP CALLBACK DEFINED IN: ', this.piprTourStep());
    }
  }

  ngOnDestroy(): void {
    this.tourService.unregisterStep(this.piprTourStep());
  }
}
