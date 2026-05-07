import { Directive, input, TemplateRef, Type } from '@angular/core';
import {
  TooltipPlacement,
  PulseVariant,
  SpotlightVariant,
} from '../model/tour.enum';

@Directive({ selector: '[piprTourStep]' })
export class PiprTourStepDirective {
  piprTourStep = input.required<string>(); // stepId — alias dla selektora
  tourId = input.required<string>();
  order = input<number>(0);
  title = input.required<string>();
  content = input<string>();
  template = input<TemplateRef<unknown>>();
  component = input<Type<unknown>>();
  placement = input<TooltipPlacement>(TooltipPlacement.BOTTOM);
  pulse = input<PulseVariant>(PulseVariant.PRIMARY);
  spotlight = input<SpotlightVariant>();
  route = input<string>();
  draggable = input<boolean>(false);
}
