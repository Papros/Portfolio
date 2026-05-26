import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { PiprTourService, PiprTourStepDirective, PulseVariant, SpotlightVariant, TooltipPlacement } from '@papros-it/demo-overlay';

@Component({
  selector: 'pipr-tour-custom-template-example',
  standalone: true,
  imports: [PiprTourStepDirective],
  template: `
    <!-- Templates passed via [template] input — rendered inside the overlay -->
    <ng-template #welcomeTpl>
      <div class="tpl">
        <div class="tpl__icon">👋</div>
        <h4 class="tpl__title">Welcome to the portfolio!</h4>
        <p class="tpl__body">
          This is a fully custom template. You can embed
          <strong>any Angular content</strong> here — images, links, videos,
          or interactive controls.
        </p>
        <a class="tpl__link" href="#" (click)="$event.preventDefault()">Read the docs →</a>
      </div>
    </ng-template>

    <ng-template #videoTpl>
      <div class="tpl">
        <div class="tpl__video">
          <span class="play">▶</span>
          <span class="play-label">2 min walkthrough</span>
        </div>
        <p class="tpl__body">
          Embed a YouTube iframe, Lottie animation, or any rich media by passing
          a <code>TemplateRef</code> via <code>[template]</code>.
        </p>
      </div>
    </ng-template>

    <ng-template #checklistTpl>
      <div class="tpl">
        <h4 class="tpl__title">Before you start</h4>
        <ul class="tpl__list">
          <li>✅ Angular 17+ project</li>
          <li>✅ <code>providePiprTour()</code> in app config</li>
          <li>✅ Directives imported in your component</li>
        </ul>
      </div>
    </ng-template>

    <!-- Anchor elements -->
    <div class="demo-layout">
      <div
        class="card"
        piprTourStep="tpl-1"
        [tourId]="TOUR_ID"
        [order]="1"
        title="Welcome"
        [template]="welcomeTpl"
        [spotlight]="SpotlightVariant.FULL"
        [pulse]="PulseVariant.PRIMARY"
        [placement]="TooltipPlacement.BOTTOM"
      >
        <span class="tag">Template #1</span>
        <p>Custom content with rich HTML and a link</p>
      </div>

      <div
        class="card"
        piprTourStep="tpl-2"
        [tourId]="TOUR_ID"
        [order]="2"
        title="Video step"
        [template]="videoTpl"
        [spotlight]="SpotlightVariant.SUBTLE"
        [pulse]="PulseVariant.SECONDARY"
        [placement]="TooltipPlacement.BOTTOM"
      >
        <span class="tag">Template #2</span>
        <p>Rich media placeholder — video or Lottie animation</p>
      </div>

      <div
        class="card"
        piprTourStep="tpl-3"
        [tourId]="TOUR_ID"
        [order]="3"
        title="Checklist step"
        [template]="checklistTpl"
        [spotlight]="SpotlightVariant.NONE"
        [pulse]="PulseVariant.ACCENT"
        [placement]="TooltipPlacement.BOTTOM"
      >
        <span class="tag">Template #3</span>
        <p>Interactive checklist or form inside the tooltip</p>
      </div>

      <div class="actions">
        <button class="btn-primary" (click)="start()">Start template tour</button>
        <button class="btn-ghost"   (click)="restart()">Restart</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-layout { display: flex; flex-direction: column; gap: 12px; font-family: sans-serif; }
    .card {
      padding: 16px; background: #fff; border: 1px solid #e5e5e5;
      border-radius: 8px; display: flex; flex-direction: column; gap: 6px;
    }
    .card p { margin: 0; font-size: 13px; color: #666; }
    .tag {
      font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
      color: #5c6bc0; background: #ededff; padding: 2px 8px; border-radius: 10px; align-self: flex-start;
    }
    /* Template styles — rendered inside overlay */
    .tpl { display: flex; flex-direction: column; gap: 8px; }
    .tpl__icon  { font-size: 28px; }
    .tpl__title { margin: 0; font-size: 14px; font-weight: 600; color: #222; }
    .tpl__body  { margin: 0; font-size: 13px; color: #555; line-height: 1.5; }
    .tpl__body code, .tpl__list code {
      background: #ededff; padding: 1px 5px; border-radius: 3px; font-size: 12px;
    }
    .tpl__link  { font-size: 12px; color: #5c6bc0; font-weight: 500; }
    .tpl__video {
      display: flex; align-items: center; gap: 10px;
      background: #f0f0f0; border-radius: 6px; padding: 12px 16px;
    }
    .play       { font-size: 20px; color: #5c6bc0; }
    .play-label { font-size: 13px; color: #555; }
    .tpl__list  { margin: 0; padding: 0 0 0 4px; list-style: none; }
    .tpl__list li { font-size: 13px; color: #444; padding: 3px 0; }
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
export class TourCustomTemplateExampleComponent {
  readonly TOUR_ID          = 'template-tour';
  readonly TooltipPlacement = TooltipPlacement;
  readonly SpotlightVariant = SpotlightVariant;
  readonly PulseVariant     = PulseVariant;

  private readonly tourService = inject(PiprTourService);

  start():   void { this.tourService.startTour(this.TOUR_ID); }
  restart(): void { this.tourService.restartTour(this.TOUR_ID); }
}