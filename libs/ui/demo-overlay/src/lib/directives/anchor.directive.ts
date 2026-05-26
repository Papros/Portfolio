import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PiprTourService } from '../service/tour.service';

@Directive({ selector: '[piprAnchor]', standalone: true })
export class PiprAnchorDirective implements OnInit, OnDestroy {
  /** piprAnchor — selector for registry */
  readonly piprAnchor = input.required<string>();
  readonly piprAnchorSelector = input<string | undefined>();

  private readonly tourService = inject(PiprTourService);
  private readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  ngOnInit(): void {
    let element;

    const selector = this.piprAnchorSelector();
    if (selector) {
      element = this.elementRef.nativeElement.querySelector(selector);
    }

    this.tourService.registerAnchor(
      this.piprAnchor(),
      element ?? this.elementRef.nativeElement,
    );
  }

  ngOnDestroy(): void {
    this.tourService.unregisterAnchor(this.piprAnchor());
  }
}
