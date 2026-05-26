import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { HintDismissBehavior, PiprHintDirective, PiprTourService, PiprTourStepDirective, PulseVariant, SpotlightVariant, TooltipPlacement, TourTrigger, TourTriggerAction } from '@papros-it/demo-overlay';

@Component({
  selector: 'pipr-hint-triggers-example',
  standalone: true,
  imports: [PiprHintDirective],
  template: `
    <div class="demo-layout">
      <p class="note">
        Each card demonstrates a different <code>TourTrigger</code> strategy.
        Hints are independent and suppressed when a tour is active.
        Once dismissed they won't reappear (localStorage). Click
        <em>Reset all</em> to clear seen state.
      </p>

      <div class="grid">

        <!-- ON_VIEWPORT_ENTRY -->
        <div
          class="card"
          [piprHint]="'h-viewport'"
          [trigger]="TourTrigger.ON_VIEWPORT_ENTRY"
          [triggerAction]="TourTriggerAction.START"
          [dismiss]="HintDismissBehavior.BOTH"
          [pulse]="PulseVariant.PRIMARY"
          [spotlight]="SpotlightVariant.SUBTLE"
          [placement]="TooltipPlacement.BOTTOM"
          [persist]="true"
          title="Viewport entry"
          content="Appeared because this element entered the viewport (IntersectionObserver, threshold 20%)."
        >
          <span class="icon">👁️</span>
          <span class="trigger-name">ON_VIEWPORT_ENTRY</span>
          <span class="desc">IntersectionObserver — one-shot on first visible entry</span>
        </div>

        <!-- ON_HOVER -->
        <div
          class="card"
          [piprHint]="'h-hover'"
          [trigger]="TourTrigger.ON_HOVER"
          [triggerAction]="TourTriggerAction.START"
          [dismiss]="HintDismissBehavior.ON_CLICK_OUTSIDE"
          [pulse]="PulseVariant.SECONDARY"
          [spotlight]="SpotlightVariant.NONE"
          [placement]="TooltipPlacement.RIGHT"
          [persist]="true"
          title="Hover trigger"
          content="Appeared on the first mouseenter event over this element."
        >
          <span class="icon">🖱️</span>
          <span class="trigger-name">ON_HOVER</span>
          <span class="desc">First mouseenter — one-shot, won't repeat on subsequent hovers</span>
        </div>

        <!-- ON_DELAY -->
        <div
          class="card"
          [piprHint]="'h-delay'"
          [trigger]="TourTrigger.ON_DELAY"
          [triggerAction]="TourTriggerAction.START_AFTER_INVITE"
          [dismiss]="HintDismissBehavior.BOTH"
          [pulse]="PulseVariant.ACCENT"
          [spotlight]="SpotlightVariant.SUBTLE"
          [placement]="TooltipPlacement.TOP"
          [delayMs]="4000"
          [persist]="true"
          inviteText="Want a quick tip about this section?"
          title="Delayed hint"
          content="Appeared 4 seconds after the page loaded."
        >
          <span class="icon">⏱️</span>
          <span class="trigger-name">ON_DELAY</span>
          <span class="desc">setTimeout — fires after <code>delayMs</code> (here 4 000 ms)</span>
        </div>

        <!-- ON_IDLE -->
        <div
          class="card"
          [piprHint]="'h-idle'"
          [trigger]="TourTrigger.ON_IDLE"
          [triggerAction]="TourTriggerAction.START"
          [dismiss]="HintDismissBehavior.ON_DISMISS_BUTTON"
          [pulse]="PulseVariant.PRIMARY"
          [spotlight]="SpotlightVariant.NONE"
          [placement]="TooltipPlacement.LEFT"
          [idleMs]="6000"
          [persist]="true"
          title="Idle trigger"
          content="You've been idle for 6 seconds — here's a helpful tip!"
        >
          <span class="icon">💤</span>
          <span class="trigger-name">ON_IDLE</span>
          <span class="desc">Fires after <code>idleMs</code> of no mouse/keyboard/scroll</span>
        </div>

        <!-- MANUAL -->
        <div
          class="card"
          [piprHint]="'h-manual'"
          [trigger]="TourTrigger.MANUAL"
          [dismiss]="HintDismissBehavior.BOTH"
          [pulse]="PulseVariant.SECONDARY"
          [spotlight]="SpotlightVariant.SUBTLE"
          [placement]="TooltipPlacement.BOTTOM"
          [persist]="false"
          title="Manual trigger"
          content="Triggered programmatically via tourService.triggerHint()."
        >
          <span class="icon">🎛️</span>
          <span class="trigger-name">MANUAL</span>
          <span class="desc">No automatic trigger — call <code>triggerHint('h-manual')</code></span>
          <button class="trigger-btn" (click)="triggerManual()">Trigger now</button>
        </div>

      </div>

      <div class="actions">
        <button class="btn-ghost" (click)="resetAll()">Reset all hints</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-layout { display: flex; flex-direction: column; gap: 16px; font-family: sans-serif; }
    .note {
      font-size: 13px; color: #555; background: #f8f8f8;
      border-left: 3px solid #5c6bc0; padding: 10px 14px; border-radius: 4px; margin: 0;
    }
    .note code { background: #ededff; padding: 1px 5px; border-radius: 3px; font-size: 12px; color: #3949ab; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
    .card {
      display: flex; flex-direction: column; gap: 6px;
      padding: 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px;
    }
    .icon  { font-size: 24px; }
    .trigger-name {
      font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
      color: #5c6bc0; font-family: monospace;
    }
    .desc { font-size: 12px; color: #666; line-height: 1.5; }
    .desc code { background: #ededff; padding: 1px 4px; border-radius: 3px; font-size: 11px; }
    .trigger-btn {
      margin-top: 4px; padding: 5px 12px; font-size: 12px; font-weight: 500;
      background: #5c6bc0; color: #fff; border: none; border-radius: 6px;
      cursor: pointer; align-self: flex-start;
    }
    .actions { display: flex; }
    .btn-ghost {
      padding: 8px 16px; background: transparent; color: #5c6bc0;
      border: 1px solid #5c6bc0; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
  `],
})
export class HintTriggersExampleComponent {
  readonly TourTrigger         = TourTrigger;
  readonly TourTriggerAction   = TourTriggerAction;
  readonly HintDismissBehavior = HintDismissBehavior;
  readonly PulseVariant        = PulseVariant;
  readonly SpotlightVariant    = SpotlightVariant;
  readonly TooltipPlacement    = TooltipPlacement;

  private readonly tourService = inject(PiprTourService);

  triggerManual(): void { this.tourService.triggerHint('h-manual'); }

  resetAll(): void {
    ['h-viewport', 'h-hover', 'h-delay', 'h-idle', 'h-manual']
      .forEach(id => this.tourService.resetHint(id));
  }
}