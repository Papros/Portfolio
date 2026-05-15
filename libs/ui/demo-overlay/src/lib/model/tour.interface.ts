import { TemplateRef, Type } from '@angular/core';
import {
  HintDismissBehavior,
  PulseVariant,
  SpotlightVariant,
  TooltipPlacement,
  TourTrigger,
  TourTriggerAction,
} from './tour.enum';

export interface TourStepContent {
  title: string;
  content?: string; // plain text or HTML string
  template?: TemplateRef<unknown>; // custom template, overrides content
  component?: Type<unknown>; // dynamic component, highest priority
}

export interface TourStep extends TourStepContent {
  stepId: string;
  order: number;
  route?: string; // navigate before showing step
  placement: TooltipPlacement;
  pulse: PulseVariant;
  spotlight: SpotlightVariant;
  draggable: boolean; // allow drag if obscured
  scrollIntoView: boolean;
  anchorSelector?: string; // selector to element in host children
  pulseSelector?: string;
  anchorId?: string; // selector for elements in registry
}

export interface TourConfig {
  tourId: string;
  steps: TourStep[];
  spotlight: SpotlightVariant; // tour-level default
  pulse: PulseVariant;
  persist: boolean; // save seen in storage, default true
  allowKeyboard: boolean; // Escape=skip, arrows=prev/next
  skipLabel: string;
  nextLabel: string;
  prevLabel: string;
  finishLabel: string;
  showProgress: boolean;
}

export interface HintConfig extends TourStepContent {
  hintId: string;
  trigger: TourTrigger;
  triggerAction: TourTriggerAction;
  dismiss: HintDismissBehavior;
  autoCloseMs?: number; // only with AUTO dismiss
  delayMs?: number; // with ON_DELAY trigger
  idleMs?: number; // with ON_IDLE trigger
  placement: TooltipPlacement;
  pulse: PulseVariant;
  spotlight: SpotlightVariant;
  persist: boolean;
  draggable: boolean;
  inviteText?: string; // text in invite tooltip
  anchorSelector?: string; //child component being focus
  pulseSelector?: string;
  anchorId?: string; // selector for elements in registry
}

export interface RegisteredStep {
  stepId: string;
  tourId: string;
  order: number;
  elementRef: { nativeElement: Element };
  config: Partial<TourStep>;
}

export interface RegisteredHint {
  hintId: string;
  elementRef: { nativeElement: Element };
  config: HintConfig;
}

export interface TourDefaults {
  placement: TooltipPlacement;
  pulse: PulseVariant;
  spotlight: SpotlightVariant;
  showProgress: boolean;
  allowKeyboard: boolean;
  skipLabel: string;
  nextLabel: string;
  prevLabel: string;
  finishLabel: string;
}

export interface PiprTourGlobalConfig {
  userId: string;
  tours?: TourConfig[];
  hints?: HintConfig[];
  storage?: any;
  navigation?: any;
  defaults?: Partial<TourDefaults>;
}
