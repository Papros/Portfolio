import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { HintDismissBehavior, IPiprTourStorage, PiprAnchorDirective, PiprHintDirective, PiprTourService, PiprTourStepDirective, PulseVariant, SpotlightVariant, TooltipPlacement, TourEvent, TourTrigger, TourTriggerAction } from '@papros-it/demo-overlay';
import { Subscription } from 'rxjs';


// - Custom in-memory storage (no persistence) ------------
// Shows how to implement IPiprTourStorage. Swap localStorage for an API call,
// IndexedDB, or any async store wrapped in a sync cache.

export class MemoryTourStorage implements IPiprTourStorage {
  private readonly seen = new Set<string>();
  markSeen(_userId: string, id: string): void    { this.seen.add(id); }
  hasSeen(_userId: string, id: string): boolean  { return this.seen.has(id); }
  clearSeen(_userId: string, id?: string): void  { id ? this.seen.delete(id) : this.seen.clear(); }
  getAllSeen(_userId: string): string[]           { return [...this.seen]; }
}

interface LogEntry { type: string; detail: string; time: string; }

@Component({
  selector: 'pipr-tour-events-example',
  standalone: true,
  imports: [PiprTourStepDirective, NgFor, NgClass, CommonModule],
  template: `
    <div class="demo-layout">
      <p class="note">
        <code>PiprTourService.events$</code> is a typed <code>Observable&lt;TourEvent&gt;</code>
        you can subscribe to anywhere in the app. The log below updates in real time.
        <br><br>
        This example also uses <code>MemoryTourStorage</code> — a custom storage
        implementation with no persistence. The tour can be restarted any number of times.
      </p>

      <div class="cols">
        <div class="steps-col">
          <div
            class="step-card"
            piprTourStep="evt-1"
            [tourId]="TOUR_ID"
            [order]="1"
            title="Step one"
            content="First step. Watch the events log on the right."
            [spotlight]="SpotlightVariant.FULL"
            [pulse]="PulseVariant.PRIMARY"
            [placement]="TooltipPlacement.RIGHT"
          >Step 1</div>

          <div
            class="step-card"
            piprTourStep="evt-2"
            [tourId]="TOUR_ID"
            [order]="2"
            title="Step two"
            content="stepChanged fires with index 1."
            [spotlight]="SpotlightVariant.FULL"
            [pulse]="PulseVariant.SECONDARY"
            [placement]="TooltipPlacement.RIGHT"
          >Step 2</div>

          <div
            class="step-card"
            piprTourStep="evt-3"
            [tourId]="TOUR_ID"
            [order]="3"
            title="Step three"
            content="Completing fires tourCompleted."
            [spotlight]="SpotlightVariant.FULL"
            [pulse]="PulseVariant.ACCENT"
            [placement]="TooltipPlacement.RIGHT"
          >Step 3</div>

          <div class="step-actions">
            <button class="btn-primary" (click)="start()">Start tour</button>
            <button class="btn-ghost"   (click)="restart()">Restart</button>
            <button class="btn-danger"  (click)="clearLog()">Clear log</button>
          </div>
        </div>

        <div class="log">
          <div class="log-header">
            <span>events$</span>
            <span class="log-count">{{ log.length }} events</span>
          </div>
          <div class="log-body">
            <div
              *ngFor="let e of log"
              class="log-entry"
              [ngClass]="'log-entry--' + e.type"
            >
              <span class="log-time">{{ e.time }}</span>
              <span class="log-type">{{ e.type }}</span>
              <span class="log-detail">{{ e.detail }}</span>
            </div>
            <div *ngIf="log.length === 0" class="log-empty">
              No events yet. Start the tour.
            </div>
          </div>
        </div>
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
    .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .steps-col { display: flex; flex-direction: column; gap: 10px; }
    .step-card {
      padding: 14px 16px; background: #fff; border: 1px solid #e5e5e5;
      border-radius: 8px; font-size: 14px; font-weight: 500; color: #333;
    }
    .step-actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn-primary {
      padding: 7px 14px; background: #5c6bc0; color: #fff;
      border: none; border-radius: 6px; cursor: pointer; font-size: 12px;
    }
    .btn-ghost {
      padding: 7px 14px; background: transparent; color: #5c6bc0;
      border: 1px solid #5c6bc0; border-radius: 6px; cursor: pointer; font-size: 12px;
    }
    .btn-danger {
      padding: 7px 14px; background: transparent; color: #e53935;
      border: 1px solid #e53935; border-radius: 6px; cursor: pointer; font-size: 12px;
    }

    .log {
      display: flex; flex-direction: column;
      border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; font-family: monospace;
    }
    .log-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; background: #f5f5f5; border-bottom: 1px solid #e5e5e5;
      font-size: 12px; font-weight: 600; color: #333;
    }
    .log-count { font-size: 11px; color: #888; font-weight: 400; }
    .log-body  { flex: 1; overflow-y: auto; max-height: 260px; }
    .log-entry {
      display: grid; grid-template-columns: 60px 1fr 1fr;
      gap: 8px; padding: 5px 12px; font-size: 11px; border-bottom: 1px solid #f0f0f0;
    }
    .log-time   { color: #aaa; }
    .log-type   { font-weight: 700; }
    .log-detail { color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .log-entry--tourStarted   .log-type { color: #5c6bc0; }
    .log-entry--stepChanged   .log-type { color: #26a69a; }
    .log-entry--tourCompleted .log-type { color: #43a047; }
    .log-entry--tourSkipped   .log-type { color: #f57c00; }
    .log-entry--tourPaused    .log-type { color: #8d6e63; }
    .log-entry--tourResumed   .log-type { color: #26a69a; }
    .log-empty { padding: 16px 12px; font-size: 12px; color: #bbb; text-align: center; font-family: sans-serif; }
  `],
})
export class TourEventsExampleComponent implements OnInit, OnDestroy {
  readonly TOUR_ID          = 'events-tour';
  readonly SpotlightVariant = SpotlightVariant;
  readonly PulseVariant     = PulseVariant;
  readonly TooltipPlacement = TooltipPlacement;

  log: LogEntry[] = [];

  private readonly tourService = inject(PiprTourService);
  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.tourService.events$.subscribe(e => {
      this.log.unshift(this.format(e));
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  start():    void { this.tourService.startTour(this.TOUR_ID); }
  restart():  void { this.tourService.restartTour(this.TOUR_ID); }
  clearLog(): void { this.log = []; }

  private format(e: TourEvent): LogEntry {
    const time = new Date().toLocaleTimeString('en', {
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const parts: string[] = [];
    if ('tourId' in e) parts.push(`tourId: ${(e as any).tourId}`);
    if ('stepId' in e) parts.push(`stepId: ${(e as any).stepId}`);
    if ('index'  in e) parts.push(`index: ${(e as any).index}`);
    if ('hintId' in e) parts.push(`hintId: ${(e as any).hintId}`);
    return { type: e.type, detail: parts.join(' · '), time };
  }
}