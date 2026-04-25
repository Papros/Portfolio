import {
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OperatorParam,
  PanelFocus,
  PipeOperator,
  RxJSOperatorName,
  StreamData,
  StreamEvent,
} from '../../interfaces/challenge.interface';
import { OPERATOR_METADATA } from '../../interfaces/operator-meta.const';

@Component({
  selector: 'lib-data-form',
  imports: [CommonModule],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss',
})
export class DataFormComponent {
  @ViewChild('codeInput') codeInputRef!: ElementRef<HTMLInputElement>;

  // Interface
  panelFocus = input<PanelFocus>(null);
  sourceStreams = input<StreamData[]>([]);
  operators = input<PipeOperator[]>([]);
  outputLocked = input<boolean>(true);
  maxTime = input<number>(100);
  operatorOptions = input<RxJSOperatorName[]>([
    'map',
    'filter',
    'tap',
    'take',
    'skip',
    'switchMap',
    'mergeMap',
    'concatMap',
    'catchError',
    'combineLatest',
    'zip',
    'forkJoin',
  ]);

  marbleAdded = output<{ streamIndex: number; event: StreamEvent }>();
  marbleRemoved = output<{ streamIndex: number; marbleIndex: number }>();
  marbleUpdated = output<{
    streamIndex: number;
    marbleIndex: number;
    event: StreamEvent;
  }>();
  operatorAdded = output<{ operator: PipeOperator }>();
  operatorUpdated = output<{ index: number; operator: PipeOperator }>();

  // Formularz dodawania marble
  focusedMarbleIndex = signal<number | null>(null);
  newMarbleTime = signal<number>(0);
  newMarbleLabel = signal<string>('');
  newMarbleType = signal<'next' | 'error' | 'complete'>('next');
  isEditingMarble = computed(() => this.focusedMarbleIndex() !== null);

  // Formularz operatora
  editingOperatorIndex = signal<number | null>(null);
  selectedOperator = signal<RxJSOperatorName | null>(null);
  operatorCode = signal<string>('');
  isEditingOperator = computed(() => this.editingOperatorIndex() !== null);

  // Helpers
  currentOperatorParams = computed<OperatorParam[]>(() => {
    const op = this.selectedOperator();
    if (!op) return [];
    // jeśli edytujemy istniejący operator z inputParams — użyj ich (override statyczny)
    const editIdx = this.editingOperatorIndex();
    if (editIdx !== null) {
      const existing = this.operators()[editIdx];
      if (existing?.inputParams?.length) return existing.inputParams;
    }
    return OPERATOR_METADATA[op]?.params ?? [];
  });

  paramsToString = computed(() =>
    this.currentOperatorParams()
      .map((p) => `${p.name}: ${p.type}`)
      .join(', '),
  );

  hasParams = computed(() => this.currentOperatorParams().length > 0);

  readonly eventTypes = ['next', 'error', 'complete'] as const;

  currentStream = computed<StreamData | null>(() => {
    const focus = this.panelFocus();
    if (focus?.kind !== 'source') return null;
    return this.sourceStreams()[focus.index] ?? null;
  });

  // Marble

  onMarbleRowClick(index: number): void {
    const stream = this.currentStream();
    if (!stream) return;
    const event = stream.stream[index];
    if (!event) return;

    if (this.focusedMarbleIndex() === index) {
      this.clearMarbleForm();
      return;
    }

    this.focusedMarbleIndex.set(index);
    this.newMarbleTime.set(event.timeInterval);
    this.newMarbleLabel.set(event.type !== 'complete' ? event.label : '');
    this.newMarbleType.set(event.type);
  }

  onSaveMarble(): void {
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

    const editIndex = this.focusedMarbleIndex();
    if (editIndex !== null) {
      this.marbleUpdated.emit({
        streamIndex: focus.index,
        marbleIndex: editIndex,
        event,
      });
    } else {
      this.marbleAdded.emit({ streamIndex: focus.index, event });
    }
    this.clearMarbleForm();
  }

  onRemoveMarble(marbleIndex: number): void {
    const focus = this.panelFocus();
    if (focus?.kind !== 'source') return;
    this.marbleRemoved.emit({ streamIndex: focus.index, marbleIndex });
    if (this.focusedMarbleIndex() === marbleIndex) this.clearMarbleForm();
  }

  clearMarbleForm(): void {
    this.focusedMarbleIndex.set(null);
    this.newMarbleTime.set(0);
    this.newMarbleLabel.set('');
    this.newMarbleType.set('next');
  }

  //Operator

  focusOperator(index: number): void {
    const op = this.operators()[index];
    if (!op) return;
    this.editingOperatorIndex.set(index);
    this.selectedOperator.set(op.operator);
    this.operatorCode.set(op.code ?? '');
  }

  onOperatorSelect(op: RxJSOperatorName): void {
    this.selectedOperator.set(op);
    // przy zmianie operatora wyczyść kod — nowy operator ma inne parametry
    this.operatorCode.set('');
  }

  onConfirmOperator(): void {
    const op = this.selectedOperator();
    if (!op) return;

    const operator: PipeOperator = {
      operator: op,
      code: this.operatorCode() || undefined,
      locked: false,
      inputParams: OPERATOR_METADATA[op]?.params,
    };

    const editIdx = this.editingOperatorIndex();
    if (editIdx !== null) {
      this.operatorUpdated.emit({ index: editIdx, operator });
    } else {
      this.operatorAdded.emit({ operator: operator });
    }

    this.clearOperatorForm();
  }

  clearOperatorForm(): void {
    this.editingOperatorIndex.set(null);
    this.selectedOperator.set(null);
    this.operatorCode.set('');
  }

  // Code snippet

  insertSnippet(paramName: string): void {
    const input = this.codeInputRef?.nativeElement;
    if (!input) {
      this.operatorCode.update((v) => v + paramName);
      return;
    }

    const start = input.selectionStart ?? this.operatorCode().length;
    const end = input.selectionEnd ?? this.operatorCode().length;
    const current = this.operatorCode();
    const updated = current.slice(0, start) + paramName + current.slice(end);

    this.operatorCode.set(updated);

    // przywróć focus i ustaw kursor za wstawionym snippetem
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(
        start + paramName.length,
        start + paramName.length,
      );
    });
  }
}
