import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarbleTrackComponent } from '../marble-track/marble-track.component';
import {
  PanelFocus,
  PipeOperator,
  RxJSChallenge,
  StreamData,
  StreamEvent,
} from '../../interfaces/challenge.interface';
import { MatSliderModule } from '@angular/material/slider';
import { PipeContainerComponent } from '../pipe-container/pipe-container.component';
import { DataFormComponent } from '../data-form/data-form.component';
import { ChallengeStateService } from '../../service/challenge-state.service';
import { OPERATOR_METADATA } from '../../interfaces/operator-meta.const';
import {
  ChallengeInterpreterService,
  ChallengeResoults,
} from '../../service/challenge-interpreter.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-challenge-container',
  imports: [
    CommonModule,
    MarbleTrackComponent,
    MatSliderModule,
    PipeContainerComponent,
    DataFormComponent,
    MatIconModule,
  ],
  providers: [ChallengeInterpreterService],
  templateUrl: './challenge-container.component.html',
  styleUrl: './challenge-container.component.scss',
})
export class ChallengeContainerComponent implements OnDestroy {
  initChallenge = input.required<RxJSChallenge>();

  nextChallenge = input<{ id: number; label: string } | null>(null);
  prevChallenge = input<{ id: number; label: string } | null>(null);

  navigateChallenge = output<number>();

  private challangeStateService = inject(ChallengeStateService);
  private interpreter = inject(ChallengeInterpreterService);

  challenge = this.challangeStateService.challenge;

  // Local state
  readonly maxTime = 100;
  readonly progressRange = [1, 2, 3, 4, 5];

  simulatedTime = signal<number>(0);
  isPlaying = signal<boolean>(false);
  private playInterval: ReturnType<typeof setInterval> | null = null;

  panelFocus = signal<PanelFocus>(null);

  constructor() {
    effect(() => {
      this.challangeStateService.initChallenge(this.initChallenge());
    });
  }

  highlightNext = computed(() => {
    const resoult = this.resoultFeedback();
    return resoult?.passed ?? false;
  });

  // Feedback
  feedback = signal<{
    type: 'success' | 'error' | 'hint';
    message: string;
  } | null>(null);

  resoultFeedback = signal<ChallengeResoults | null>(null);

  sourceStreamData = computed<StreamData[]>(() =>
    this.challenge().data.sourceStreams.map((s) => s.stream),
  );

  pipeOperators = computed<PipeOperator[]>(() => this.challenge().data.pipe);

  isPanelFocused(kind: 'source' | 'pipe' | 'output', index?: number): boolean {
    const f = this.panelFocus();
    if (!f) return false;
    if (f.kind !== kind) return false;
    if (kind === 'source' && f.kind === 'source') return f.index === index;
    return true;
  }

  // Time interactions

  onSliderChange(value: number): void {
    this.simulatedTime.set(value);
    if (this.isPlaying()) this.stopPlay();
  }

  togglePlay(): void {
    this.isPlaying() ? this.stopPlay() : this.startPlay();
  }

  private startPlay(): void {
    this.isPlaying.set(true);
    if (this.simulatedTime() >= this.maxTime) {
      this.simulatedTime.set(0);
    }
    this.playInterval = setInterval(() => {
      const next = this.simulatedTime() + 1;
      this.simulatedTime.set(next);
      if (next >= this.maxTime) this.stopPlay();
    }, 50);
  }

  private stopPlay(): void {
    this.isPlaying.set(false);
    if (this.playInterval !== null) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
  }

  // Marble track handlers
  onSourceTrackClick(index: number): void {
    this.panelFocus.set({ kind: 'source', index });
  }

  onOutputTrackClick(): void {
    this.panelFocus.set({ kind: 'output' });
  }

  onSourceMarbleClick(streamIndex: number, marbleIndex: number): void {
    this.panelFocus.set({ kind: 'source', index: streamIndex, marbleIndex });
  }

  onOutputMarbleClick(marbleIndex: number): void {
    this.panelFocus.set({ kind: 'output', marbleIndex });
  }

  onTrackAreaClick(streamIndex: number, time: number): void {
    this.panelFocus.set({ kind: 'source', index: streamIndex, initTime: time });
  }

  onOutputAreaClick(time: number): void {
    this.panelFocus.set({ kind: 'output', initTime: time });
  }

  onMarbleMoved(
    streamIndex: number,
    event: { index: number; newTime: number },
    output = false,
  ): void {
    this.challangeStateService.moveMarble(streamIndex, event, output);
  }

  onMarbleDragEnd(
    streamIndex: number,
    marbleIndex: number,
    output = false,
  ): void {
    this.challangeStateService.commitMarbleMove(
      streamIndex,
      marbleIndex,
      output,
    );
  }

  onAddOperator(): void {
    this.panelFocus.set({ kind: 'pipe' });
  }

  onOperatorClick(operatorIndex: number): void {
    this.panelFocus.set({ kind: 'pipe', operatorIndex });
  }

  onPipeClick(): void {
    this.panelFocus.set({ kind: 'pipe' });
  }

  // CRUD

  onRemoveOperator(index: number): void {
    this.challangeStateService.removeOperator(index);
  }

  onOperatorConfirmed(event: { operator: PipeOperator }): void {
    this.panelFocus.set(null);
    this.challangeStateService.addOperator(event.operator);
  }

  onOperatorUpdate(event: { index: number; operator: PipeOperator }): void {
    this.panelFocus.set(null);
    this.challangeStateService.updateOperator(event.index, event.operator);
  }

  onAddSourceStream(): void {
    this.challangeStateService.addSourceStream();
  }

  onRemoveSourceStream(index: number): void {
    this.challangeStateService.removeSourceStream(index);
  }

  //------ DataForm controlers -----------------
  onMarbleAdded(event: { streamIndex: number; event: StreamEvent }): void {
    this.challangeStateService.addMarble(event.streamIndex, event.event);
  }

  onMarbleRemoved(event: { streamIndex: number; marbleIndex: number }): void {
    this.challangeStateService.removeMarble(
      event.streamIndex,
      event.marbleIndex,
    );
  }

  onMarbleUpdated(event: {
    streamIndex: number;
    marbleIndex: number;
    event: StreamEvent;
  }): void {
    this.challangeStateService.updateMarble(
      event.streamIndex,
      event.marbleIndex,
      event.event,
      this.panelFocus()?.kind === 'output',
    );
  }

  //------- Checking answer -----------

  async checkAnswer(): Promise<void> {
    this.resoultFeedback.set(null);
    this.feedback.set({ type: 'hint', message: 'Interpretuję...' });

    const challenge = this.challangeStateService.challenge();

    if (challenge.data.pipe.length == 0) {
      this.feedback.set({
        type: 'error',
        message: `Wymagany przynajmniej jeden operator.`,
      });
      return;
    }

    // walidacja: operatory combination wymagają >1 źródła
    const combinationOp = challenge.data.pipe.find((op) => {
      const meta = OPERATOR_METADATA[op.operator];
      return meta?.kind === 'combination' && meta.requiresMultipleSources;
    });

    if (combinationOp && challenge.data.sourceStreams.length < 2) {
      this.feedback.set({
        type: 'error',
        message: `${combinationOp.operator} wymaga co najmniej 2 źródeł. Dodaj kolejny source stream.`,
      });
      return;
    }

    try {
      const result = await this.interpreter.run(challenge, this.maxTime);

      if (result.error) {
        this.feedback.set({ type: 'error', message: `Błąd: ${result.error}` });
        return;
      }

      this.resoultFeedback.set(
        this.interpreter.estimateResoult(
          result.stream,
          challenge.resoult?.stream || [],
        ),
      );

      // zaktualizuj output stream w serwisie
      this.challangeStateService.setOutputStreamResult(result);

      this.feedback.set({
        type: 'success',
        message: 'Gotowe!',
      });
    } catch (err) {
      this.feedback.set({
        type: 'error',
        message: 'Nieoczekiwany błąd interpretera.',
      });
    }
  }

  // cleanup

  ngOnDestroy(): void {
    this.stopPlay();
  }
}
