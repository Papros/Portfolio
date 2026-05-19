import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { PiprTourService, PiprTourStepDirective, PulseVariant, SpotlightVariant, TooltipPlacement } from '@papros-it/demo-overlay';

interface Demo {
  stepId: string;
  label: string;
  desc: string;
  spotlight: SpotlightVariant;
  pulse: PulseVariant;
}

@Component({
  selector: 'pipr-tour-spotlight-example',
  standalone: true,
  imports: [PiprTourStepDirective, NgFor],
  template: `
    <div class="demo-layout">
      <p class="note">
        Three steps — each with a different <code>SpotlightVariant</code> and
        <code>PulseVariant</code>. Both can be set per-step, overriding tour-level
        and global defaults.
      </p>

      <div class="grid">
        <div
          *ngFor="let d of demos; let i = index"
          class="card"
          [piprTourStep]="d.stepId"
          [tourId]="TOUR_ID"
          [order]="i + 1"
          [title]="d.label"
          [content]="d.desc"
          [spotlight]="d.spotlight"
          [pulse]="d.pulse"
          [placement]="TooltipPlacement.BOTTOM"
        >
          <span class="badge">{{ d.spotlight }}</span>
          <span class="title">{{ d.label }}</span>
          <span class="sub">pulse: <code>{{ d.pulse }}</code></span>
        </div>
      </div>

      <div class="actions">
        <button class="btn-primary" (click)="start()">Run spotlight tour</button>
        <button class="btn-ghost"   (click)="restart()">Restart</button>
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
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .card {
      display: flex; flex-direction: column; gap: 6px;
      padding: 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px;
    }
    .badge {
      font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
      padding: 2px 8px; border-radius: 10px; align-self: flex-start;
      background: #ededff; color: #3949ab;
    }
    .title { font-size: 14px; font-weight: 500; color: #222; }
    .sub   { font-size: 12px; color: #888; }
    .sub code { background: #f0f0f0; padding: 1px 4px; border-radius: 3px; }
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
export class TourSpotlightExampleComponent {
  readonly TOUR_ID          = 'spotlight-tour';
  readonly TooltipPlacement = TooltipPlacement;

  readonly demos: Demo[] = [
    {
      stepId: 'spot-none',
      label: 'No spotlight',
      desc: 'Tooltip appears without any backdrop. Unobtrusive, minimal.',
      spotlight: SpotlightVariant.NONE,
      pulse: PulseVariant.PRIMARY,
    },
    {
      stepId: 'spot-subtle',
      label: 'Subtle spotlight',
      desc: 'Soft glow on the element. Backdrop stays transparent.',
      spotlight: SpotlightVariant.SUBTLE,
      pulse: PulseVariant.SECONDARY,
    },
    {
      stepId: 'spot-full',
      label: 'Full spotlight',
      desc: 'Dark overlay with the anchor element cut out. Maximum focus.',
      spotlight: SpotlightVariant.FULL,
      pulse: PulseVariant.ACCENT,
    },
  ];

  private readonly tourService = inject(PiprTourService);

  start():   void { this.tourService.startTour(this.TOUR_ID); }
  restart(): void { this.tourService.restartTour(this.TOUR_ID); }
}