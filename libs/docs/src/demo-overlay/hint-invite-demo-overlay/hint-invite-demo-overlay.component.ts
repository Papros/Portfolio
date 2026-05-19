import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { HintDismissBehavior, PiprAnchorDirective, PiprHintDirective, PiprTourService, PiprTourStepDirective, PulseVariant, SpotlightVariant, TooltipPlacement, TourTrigger, TourTriggerAction } from '@papros-it/demo-overlay';


@Component({
  selector: 'pipr-hint-invite-example',
  standalone: true,
  imports: [PiprHintDirective, PiprAnchorDirective],
  template: `
    <ng-template #exportHintTpl>
      <div class="hint-tpl">
        <p>Click <strong>Export PDF</strong> to download a professionally
        formatted version of your CV. The layout adapts to A4 automatically.</p>
      </div>
    </ng-template>

    <div class="demo-layout">
      <p class="note">
        <code>TourTriggerAction.START_AFTER_INVITE</code> shows a small invite tooltip
        first — the user opts in before seeing the full hint. Combines with
        <code>anchorId</code> to target elements inside child components.
      </p>

      <!--
        Directive on the whole card (viewport entry trigger).
        anchorId targets the export button registered via [piprAnchor] below.
        pulse goes to pulseSelector — the icon inside the button.
      -->
      <div
        class="feature-card"
        [piprHint]="'invite-export'"
        [trigger]="TourTrigger.ON_VIEWPORT_ENTRY"
        [triggerAction]="TourTriggerAction.START_AFTER_INVITE"
        [dismiss]="HintDismissBehavior.BOTH"
        [pulse]="PulseVariant.PRIMARY"
        [spotlight]="SpotlightVariant.SUBTLE"
        [placement]="TooltipPlacement.TOP"
        [persist]="false"
        inviteText="Did you know you can export your CV as PDF?"
        title="Export to PDF"
        [template]="exportHintTpl"
        anchorId="invite-export-btn"
      >
        <div class="feature-card__info">
          <h4>CV section</h4>
          <p>Your work experience, education and skills.</p>
        </div>
        <!--
          piprAnchor registers this button in the global registry.
          The hint above targets it via anchorId — even if it were inside
          a child component or a library component you don't own.
        -->
        <button class="export-btn" piprAnchor="invite-export-btn">
          ⬇ Export PDF
        </button>
      </div>

      <!--
        Hover-triggered hint on the settings row.
        anchorId targets the icon, pulseSelector also targets the icon.
        Directive sits on the whole row for a larger hover surface.
      -->
      <div
        class="settings-row"
        [piprHint]="'invite-settings'"
        [trigger]="TourTrigger.ON_HOVER"
        [triggerAction]="TourTriggerAction.START_AFTER_INVITE"
        [dismiss]="HintDismissBehavior.BOTH"
        [pulse]="PulseVariant.SECONDARY"
        [spotlight]="SpotlightVariant.NONE"
        [placement]="TooltipPlacement.RIGHT"
        [persist]="false"
        inviteText="Want to see theme options?"
        title="Theme settings"
        content="Switch between light, dark, and system theme. Your preference is saved automatically."
        anchorId="invite-settings-icon"
      >
        <span class="settings-icon" piprAnchor="invite-settings-icon">⚙️</span>
        <span class="settings-label">Theme &amp; display</span>
        <span class="settings-meta">Hover for a tip</span>
      </div>

      <div class="actions">
        <button class="btn-ghost" (click)="resetAll()">Reset hints</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-layout { display: flex; flex-direction: column; gap: 16px; font-family: sans-serif; }
    .note {
      font-size: 13px; color: #555; background: #f8f8f8;
      border-left: 3px solid #5c6bc0; padding: 10px 14px; border-radius: 4px; margin: 0; line-height: 1.6;
    }
    .note code { background: #ededff; padding: 1px 5px; border-radius: 3px; font-size: 12px; color: #3949ab; }

    .feature-card {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; gap: 16px;
    }
    .feature-card__info h4 { margin: 0 0 4px; font-size: 14px; color: #222; }
    .feature-card__info p  { margin: 0; font-size: 13px; color: #666; }
    .export-btn {
      flex-shrink: 0; padding: 8px 16px; background: #5c6bc0; color: #fff;
      border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500;
      white-space: nowrap;
    }

    .settings-row {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; background: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px;
      cursor: default;
    }
    .settings-icon  { font-size: 20px; }
    .settings-label { font-size: 14px; font-weight: 500; color: #333; flex: 1; }
    .settings-meta  { font-size: 12px; color: #aaa; font-style: italic; }

    .hint-tpl p { margin: 0; font-size: 13px; color: #555; line-height: 1.5; }

    .actions { display: flex; }
    .btn-ghost {
      padding: 8px 16px; background: transparent; color: #5c6bc0;
      border: 1px solid #5c6bc0; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
  `],
})
export class HintInviteExampleComponent {
  readonly TourTrigger         = TourTrigger;
  readonly TourTriggerAction   = TourTriggerAction;
  readonly HintDismissBehavior = HintDismissBehavior;
  readonly PulseVariant        = PulseVariant;
  readonly SpotlightVariant    = SpotlightVariant;
  readonly TooltipPlacement    = TooltipPlacement;

  private readonly tourService = inject(PiprTourService);

  resetAll(): void {
    this.tourService.resetHint('invite-export');
    this.tourService.resetHint('invite-settings');
  }
}