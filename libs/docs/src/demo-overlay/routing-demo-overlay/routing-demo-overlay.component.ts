import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { PiprTourService, PiprTourStepDirective, PulseVariant, SpotlightVariant, TooltipPlacement } from '@papros-it/demo-overlay';

@Component({
  selector: 'pipr-tour-routing-example',
  standalone: true,
  imports: [PiprTourStepDirective],
  template: `
    <div class="demo-layout">
      <p class="note">
        Steps with <code>[route]</code> trigger <code>router.navigateByUrl()</code>
        before the tooltip appears. <strong>Prev</strong> navigates back automatically —
        the service records the URL at which each step was shown
        (<code>resolvedRoutes</code> map) so backward navigation is always correct.
      </p>

      <div class="steps">
        <div
          class="step-card"
          piprTourStep="route-1"
          [tourId]="TOUR_ID"
          [order]="1"
          title="Home page"
          content="Step 1 — shown on /home. The service records this URL before navigating forward."
          [route]="'/home'"
          [spotlight]="SpotlightVariant.FULL"
          [pulse]="PulseVariant.PRIMARY"
          [placement]="TooltipPlacement.BOTTOM"
        >
          <span class="step-num">Step 1</span>
          <code>/home</code>
        </div>

        <div class="arrow">→</div>

        <div
          class="step-card"
          piprTourStep="route-2"
          [tourId]="TOUR_ID"
          [order]="2"
          title="Projects page"
          content="Step 2 — shown on /projects. Clicking Back navigates to /home automatically."
          [route]="'/projects'"
          [spotlight]="SpotlightVariant.FULL"
          [pulse]="PulseVariant.SECONDARY"
          [placement]="TooltipPlacement.BOTTOM"
        >
          <span class="step-num">Step 2</span>
          <code>/projects</code>
        </div>

        <div class="arrow">→</div>

        <div
          class="step-card"
          piprTourStep="route-3"
          [tourId]="TOUR_ID"
          [order]="3"
          title="Settings page"
          content="Step 3 — shown on /settings. Clicking Back returns to /projects."
          [route]="'/settings'"
          [spotlight]="SpotlightVariant.FULL"
          [pulse]="PulseVariant.ACCENT"
          [placement]="TooltipPlacement.BOTTOM"
        >
          <span class="step-num">Step 3</span>
          <code>/settings</code>
        </div>
      </div>

      <div class="actions">
        <button class="btn-primary" (click)="start()">Start cross-route tour</button>
        <button class="btn-ghost"   (click)="restart()">Restart</button>
      </div>

      <p class="hint">
        <strong>Custom navigation:</strong> implement <code>IPiprTourNavigation</code>
        and provide it via <code>PIPR_TOUR_NAVIGATION</code> to handle route guards,
        animated transitions, or non-Router navigation.
      </p>

      <p class="hint">
        <strong>Unexpected navigation:</strong> if the user navigates away manually
        (browser back, external link) configure <code>onUnexpectedNavigation</code> in
        <code>providePiprTour()</code> — <code>'skip'</code> (default), <code>'pause'</code>,
        or <code>'ignore'</code>.
      </p>
    </div>
  `,
  styles: [`
    .demo-layout { display: flex; flex-direction: column; gap: 16px; font-family: sans-serif; }
    .note, .hint {
      font-size: 13px; color: #555; margin: 0; padding: 10px 14px; border-radius: 4px;
    }
    .note { background: #f8f8f8; border-left: 3px solid #5c6bc0; }
    .hint { background: #fffbe6; border-left: 3px solid #f0b429; }
    .note code, .hint code {
      background: #ededff; padding: 1px 5px; border-radius: 3px; font-size: 12px; color: #3949ab;
    }
    .steps { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .step-card {
      flex: 1; min-width: 120px;
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      padding: 16px 12px; background: #fff;
      border: 1px solid #e5e5e5; border-radius: 8px;
    }
    .step-num {
      font-size: 10px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
      color: #5c6bc0;
    }
    .step-card code { font-size: 13px; color: #333; }
    .arrow { font-size: 20px; color: #ccc; flex-shrink: 0; }
    .actions { display: flex; gap: 8px; }
    .btn-primary {
      padding: 8px 16px; background: #5c6bc0; color: #fff;
      border: none; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .btn-ghost {
      padding: 8px 16px; background: transparent; color: #5c6bc0;
      border: 1px solid #5c6bc0; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
  `],
})
export class TourRoutingExampleComponent {
  readonly TOUR_ID          = 'routing-tour';
  readonly SpotlightVariant = SpotlightVariant;
  readonly PulseVariant     = PulseVariant;
  readonly TooltipPlacement = TooltipPlacement;

  private readonly tourService = inject(PiprTourService);

  start():   void { this.tourService.startTour(this.TOUR_ID); }
  restart(): void { this.tourService.restartTour(this.TOUR_ID); }
}