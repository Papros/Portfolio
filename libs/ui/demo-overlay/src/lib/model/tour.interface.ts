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
  /** Route to navigate before showing this step */
  route?: string;
  placement: TooltipPlacement;
  pulse: PulseVariant;
  spotlight: SpotlightVariant;
  /** Allow dragging the tooltip if it obscures the anchored element */
  draggable: boolean; // allow drag if obscured
  scrollIntoView: boolean;
   /**
   * Optional CSS selector resolved relative to the directive host.
   * When set, the pulse ring and tooltip are positioned around the
   * matching child element instead of the host itself.
   *
   * @example anchorSelector=".nav__settings-btn"
   */
  anchorSelector?: string; // selector to element in host children
  pulseSelector?: string;
  /**
   * Named anchor registered via `[piprAnchor]` directive anywhere in the tree.
   * Takes priority over `anchorSelector`. Use this when the target element lives
   * inside a child component or a component library you don't own.
   *
   * @example anchorId="menu-action"
   * @see PiprAnchorDirective
   */
  anchorId?: string; // selector for elements in registry
  /** Function called before step activate */
  setup?: () => void; // function called before step activate
  /** Function called after step deactivated */
  cleanup?: () => void; // function called after step deactivated
}

export interface TourConfig {
  tourId: string;
  steps: TourStep[];
  /** Tour-level defaults — overridden per step */
  spotlight: SpotlightVariant;
  pulse: PulseVariant;
   /** Save "seen" state to storage. Default: true */
  persist: boolean;
  /** Escape=skip, arrows=prev/next */
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
  /** Only used with HintDismissBehavior.AUTO */
  autoCloseMs?: number;
  /** Only used with TourTrigger.ON_DELAY */
  delayMs?: number;
  /** Only used with TourTrigger.ON_IDLE */
  idleMs?: number;
  placement: TooltipPlacement;
  pulse: PulseVariant;
  spotlight: SpotlightVariant;
  /** Save "seen" state to storage. Default: true */
  persist: boolean;
  draggable: boolean;
  /** Text shown in the invite tooltip before the user opts in */
  inviteText?: string;
  /**
   * Optional CSS selector resolved relative to the directive host.
   * When set, the pulse ring and tooltip are positioned around the
   * matching child element instead of the host itself.
   *
   * @example anchorSelector="button.submit"
   */
  anchorSelector?: string;
  pulseSelector?: string;
  /**
   * Named anchor registered via `[piprAnchor]` directive anywhere in the tree.
   * Takes priority over `anchorSelector`. Use this when the target element lives
   * inside a child component or a component library you don't own.
   *
   * @example anchorId="menu-action"
   * @see PiprAnchorDirective
   */
  anchorId?: string;
}

export interface RegisteredStep {
  stepId: string;
  tourId: string;
  order: number;
  /** Host element — the element the directive is attached to */
  elementRef: { nativeElement: Element };
  config: Partial<TourStep>;
}

export interface RegisteredHint {
  hintId: string;
  /** Host element — the element the directive is attached to */
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
  onUnexpectedNavigation?: 'skip' | 'pause' | 'ignore';
}
