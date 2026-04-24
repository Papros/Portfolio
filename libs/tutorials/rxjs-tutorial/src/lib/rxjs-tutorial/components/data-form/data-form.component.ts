import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PanelFocus,
  PipeOperator,
  RxJSOperatorName,
  StreamData,
  StreamEvent,
} from '../../interfaces/challenge.interface';

@Component({
  selector: 'lib-data-form',
  imports: [CommonModule],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss',
})
export class DataFormComponent {
  // Interface
  panelFocus = input<PanelFocus>(null);
  sourceStreams = input<StreamData[]>([]);
  outputLocked = input<boolean>(true);
  maxTime = input<number>(100);
  operatorOptions = input<RxJSOperatorName[]>([
    'map',
    'filter',
    'tap',
    'take',
    'switchMap',
    'mergeMap',
    'concatMap',
    'catchError',
    'combineLatest',
    'zip',
  ]);

  marbleAdded = output<{ streamIndex: number; event: StreamEvent }>();
  marbleRemoved = output<{ streamIndex: number; marbleIndex: number }>();
  operatorConfirmed = output<PipeOperator>();

  // Local state
  focusedMarbleIndex = signal<number | null>(null);

  // Formularz dodawania marble
  newMarbleTime = signal<number>(0);
  newMarbleLabel = signal<string>('');
  newMarbleType = signal<'next' | 'error' | 'complete'>('next');

  // Formularz operatora
  selectedOperator = signal<RxJSOperatorName | null>(null);
  operatorCode = signal<string>('');

  readonly eventTypes = ['next', 'error', 'complete'] as const;

  // Helpers
  currentStream = computed<StreamData | null>(() => {
    const focus = this.panelFocus();
    if (focus?.kind !== 'source') return null;
    return this.sourceStreams()[focus.index] ?? null;
  });

  onAddMarble(): void {
    const focus = this.panelFocus();
    if (focus?.kind !== 'source') return;

    const type = this.newMarbleType();

    const event: StreamEvent =
      type === 'next'
        ? {
            type: 'next',
            timeInterval: this.newMarbleTime(),
            label: this.newMarbleLabel() || '?',
          }
        : type === 'error'
          ? { type: 'error', timeInterval: this.newMarbleTime(), label: '✕' }
          : {
              type: 'complete',
              timeInterval: this.newMarbleTime(),
              label: '|',
            };

    this.marbleAdded.emit({ streamIndex: focus.index, event });

    this.newMarbleLabel.set('');
    this.newMarbleTime.set(0);
  }

  onRemoveMarble(marbleIndex: number): void {
    const focus = this.panelFocus();
    if (focus?.kind !== 'source') return;
    this.marbleRemoved.emit({ streamIndex: focus.index, marbleIndex });
    if (this.focusedMarbleIndex() === marbleIndex) {
      this.focusedMarbleIndex.set(null);
    }
  }

  onConfirmOperator(): void {
    const op = this.selectedOperator();
    if (!op) return;
    this.operatorConfirmed.emit({
      operator: op,
      code: this.operatorCode() || undefined,
      locked: false,
    });
    this.selectedOperator.set(null);
    this.operatorCode.set('');
  }
}
