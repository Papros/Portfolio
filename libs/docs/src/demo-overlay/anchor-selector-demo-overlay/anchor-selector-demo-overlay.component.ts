import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { PiprAnchorDirective, PiprTourService, PiprTourStepDirective, PulseVariant, SpotlightVariant, TooltipPlacement } from '@papros-it/demo-overlay';

/**
 * Demonstrates three anchoring strategies:
 *
 * 1. anchorId only          — tooltip + pulse on the registered element
 * 2. anchorId + anchorSelector — tooltip positioned on a child of the anchor
 * 3. anchorId + pulseSelector  — tooltip on the anchor, pulse on a specific child
 *
 * The directive host (<div piprTourStep>) can be an empty element anywhere in the
 * template. It is only used for registration — all visual focus goes to the resolved
 * anchor / selector.
 */
@Component({
  selector: 'pipr-tour-anchor-selector-example',
  standalone: true,
  imports: [PiprTourStepDirective, PiprAnchorDirective],
  template: `
    <div class="demo-layout">
      <p class="note">
        <code>[piprAnchor]</code> registers any element under a named key.
        Steps and hints reference it via <code>anchorId</code>, optionally
        combined with <code>anchorSelector</code> (child element for tooltip)
        or <code>pulseSelector</code> (child element for the pulse ring only).
        The directive host can be an empty <code>&lt;div&gt;</code> — it is only
        used for registration.
      </p>

      <!-- ── Simulated navbar with a named anchor on the avatar ──────────── -->
      <nav class="demo-nav" piprAnchor="demo-avatar">
        <span class="nav-logo">MyApp</span>
        <div class="nav-links"><a>Dashboard</a><a>Projects</a></div>
        <button class="nav-avatar">PK</button>
      </nav>

      <!-- ── Settings card with named anchor on the toggle ──────────────── -->
      <div class="settings-card" piprAnchor="demo-toggle">
        <div class="settings-info">
          <span class="settings-label">Dark mode</span>
          <span class="settings-desc">Apply dark colour scheme globally</span>
        </div>
        <div class="toggle"><div class="thumb"></div></div>
      </div>

      <!-- ── Toolbar with named anchor on the whole bar ─────────────────── -->
      <div class="toolbar" piprAnchor="demo-toolbar">
        <span class="toolbar-title">CV editor</span>
        <div class="toolbar-actions">
          <button class="tbtn">Save</button>
          <button class="tbtn">Preview</button>
          <button class="tbtn tbtn--primary export-btn">⬇ Export PDF</button>
          <button class="tbtn">Share</button>
        </div>
      </div>

      <!-- ── Empty hosts — only used for step registration ─────────────── -->

      <!-- Step 1: anchorId only → tooltip + pulse on .nav-avatar -->
      <div
        piprTourStep="anc-1"
        [tourId]="TOUR_ID"
        [order]="1"
        title="Your profile"
        content="Click your avatar to access settings and logout."
        anchorId="demo-avatar"
        anchorSelector=".nav-avatar"
        [spotlight]="SpotlightVariant.FULL"
        [pulse]="PulseVariant.PRIMARY"
        [placement]="TooltipPlacement.BOTTOM"
      ></div>

      <!-- Step 2: anchorId + anchorSelector → tooltip on .toggle -->
      <div
        piprTourStep="anc-2"
        [tourId]="TOUR_ID"
        [order]="2"
        title="Dark mode toggle"
        content="Switch between light and dark theme. Saved per device."
        anchorId="demo-toggle"
        anchorSelector=".toggle"
        [spotlight]="SpotlightVariant.SUBTLE"
        [pulse]="PulseVariant.SECONDARY"
        [placement]="TooltipPlacement.LEFT"
      ></div>

      <!-- Step 3: anchorId + anchorSelector + pulseSelector -->
      <!-- tooltip → .export-btn  |  pulse → .export-btn (same here, but could differ) -->
      <div
        piprTourStep="anc-3"
        [tourId]="TOUR_ID"
        [order]="3"
        title="Export CV"
        content="Download a print-ready PDF. Layout adapts to A4 automatically."
        anchorId="demo-toolbar"
        anchorSelector=".export-btn"
        pulseSelector=".export-btn"
        [spotlight]="SpotlightVariant.FULL"
        [pulse]="PulseVariant.ACCENT"
        [placement]="TooltipPlacement.BOTTOM"
      ></div>

      <div class="actions">
        <button class="btn-primary" (click)="start()">Start tour</button>
        <button class="btn-ghost"   (click)="restart()">Restart</button>
      </div>

      <div class="legend">
        <div class="legend-row"><code>anchorId</code> — resolves registered element from global registry</div>
        <div class="legend-row"><code>anchorSelector</code> — querySelector relative to the resolved anchor</div>
        <div class="legend-row"><code>pulseSelector</code> — separate querySelector for the pulse ring only</div>
      </div>
    </div>
  `,
  styles: [`
    .demo-layout { display: flex; flex-direction: column; gap: 12px; font-family: sans-serif; }
    .note {
      font-size: 13px; color: #555; background: #f8f8f8;
      border-left: 3px solid #5c6bc0; padding: 10px 14px; border-radius: 4px; margin: 0;
      line-height: 1.6;
    }
    .note code { background: #ededff; padding: 1px 5px; border-radius: 3px; font-size: 12px; color: #3949ab; }

    .demo-nav {
      display: flex; align-items: center; gap: 16px;
      padding: 10px 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px;
    }
    .nav-logo  { font-weight: 700; font-size: 15px; flex: 1; }
    .nav-links { display: flex; gap: 14px; font-size: 13px; color: #555; }
    .nav-links a { cursor: pointer; }
    .nav-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: #5c6bc0; color: #fff; border: none; cursor: pointer;
      font-size: 12px; font-weight: 700; flex-shrink: 0;
    }

    .settings-card {
      display: flex; align-items: center; gap: 16px;
      padding: 14px 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px;
    }
    .settings-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .settings-label { font-size: 14px; font-weight: 500; color: #222; }
    .settings-desc  { font-size: 12px; color: #888; }
    .toggle {
      width: 44px; height: 24px; border-radius: 12px;
      background: #5c6bc0; flex-shrink: 0; position: relative; cursor: pointer;
    }
    .thumb {
      width: 18px; height: 18px; border-radius: 50%; background: #fff;
      position: absolute; top: 3px; right: 3px;
    }

    .toolbar {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px;
    }
    .toolbar-title   { font-weight: 600; font-size: 14px; color: #333; flex: 1; }
    .toolbar-actions { display: flex; gap: 6px; }
    .tbtn {
      padding: 5px 12px; background: #f5f5f5; border: 1px solid #e0e0e0;
      border-radius: 5px; font-size: 12px; color: #444; cursor: pointer;
    }
    .tbtn--primary { background: #5c6bc0; color: #fff; border-color: #5c6bc0; }

    .actions { display: flex; gap: 8px; }
    .btn-primary {
      padding: 8px 16px; background: #5c6bc0; color: #fff;
      border: none; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .btn-ghost {
      padding: 8px 16px; background: transparent; color: #5c6bc0;
      border: 1px solid #5c6bc0; border-radius: 6px; cursor: pointer; font-size: 13px;
    }

    .legend { display: flex; flex-direction: column; gap: 4px; }
    .legend-row { font-size: 12px; color: #666; }
    .legend-row code {
      background: #ededff; padding: 1px 5px; border-radius: 3px; color: #3949ab;
    }
  `],
})
export class TourAnchorSelectorExampleComponent {
  readonly TOUR_ID          = 'anchor-tour';
  readonly SpotlightVariant = SpotlightVariant;
  readonly PulseVariant     = PulseVariant;
  readonly TooltipPlacement = TooltipPlacement;

  private readonly tourService = inject(PiprTourService);

  start():   void { this.tourService.startTour(this.TOUR_ID); }
  restart(): void { this.tourService.restartTour(this.TOUR_ID); }
}