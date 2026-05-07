import { Directive, input, TemplateRef } from '@angular/core';
import {
  TourTrigger,
  TourTriggerAction,
  HintDismissBehavior,
  TooltipPlacement,
  PulseVariant,
  SpotlightVariant,
} from '../model/tour.enum';

@Directive({ selector: '[piprHint]' })
export class PiprHintDirective {
  piprHint = input.required<string>(); // hintId
  trigger = input<TourTrigger>(TourTrigger.ON_VIEWPORT_ENTRY);
  triggerAction = input<TourTriggerAction>(TourTriggerAction.START);
  dismiss = input<HintDismissBehavior>(HintDismissBehavior.BOTH);
  autoCloseMs = input<number>();
  delayMs = input<number>();
  placement = input<TooltipPlacement>(TooltipPlacement.BOTTOM);
  pulse = input<PulseVariant>(PulseVariant.SECONDARY);
  spotlight = input<SpotlightVariant>(SpotlightVariant.SUBTLE);
  persist = input<boolean>(true);
  inviteText = input<string>();
  title = input.required<string>();
  content = input<string>();
  template = input<TemplateRef<unknown>>();
}
