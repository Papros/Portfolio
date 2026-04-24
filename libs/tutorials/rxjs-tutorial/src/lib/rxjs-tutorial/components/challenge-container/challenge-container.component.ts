import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
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

@Component({
  selector: 'lib-challenge-container',
  imports: [
    CommonModule,
    MarbleTrackComponent,
    MatSliderModule,
    PipeContainerComponent,
    DataFormComponent,
  ],
  providers: [ChallengeStateService],
  templateUrl: './challenge-container.component.html',
  styleUrl: './challenge-container.component.scss',
})
export class ChallengeContainerComponent implements OnInit, OnDestroy {
  initChallenge = input.required<RxJSChallenge>();

  private challangeStateService = inject(ChallengeStateService);

  challenge = this.challangeStateService.challange;

  // Local state
  readonly maxTime = 100;
  readonly progressRange = [1, 2, 3, 4, 5];

  simulatedTime = signal<number>(0);
  isPlaying = signal<boolean>(false);
  private playInterval: ReturnType<typeof setInterval> | null = null;

  panelFocus = signal<PanelFocus>(null);

  ngOnInit(): void {
    this.challangeStateService.initChallenge(this.initChallenge());
  }

  // Feedback
  feedback = signal<{
    type: 'success' | 'error' | 'hint';
    message: string;
  } | null>(null);

  sourceStreamData = computed<StreamData[]>(() =>
    this.challenge().data.sourceStreams.map((s) => s.stream),
  );

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

  // Focus handlers
  onSourceTrackClick(index: number): void {
    this.panelFocus.set({ kind: 'source', index });
  }

  onSourceMarbleClick(streamIndex: number, marbleIndex: number): void {
    this.panelFocus.set({ kind: 'source', index: streamIndex, marbleIndex });
  }

  onTrackAreaClick(streamIndex: number, time: number): void {
    this.panelFocus.set({ kind: 'source', index: streamIndex });
    //this.dataFormRef?.newMarbleTime.set(time); — przez ViewChild lub serwis
  }

  onAddOperator(): void {
    this.panelFocus.set({ kind: 'pipe' });
  }

  onOperatorClick(operatorIndex: number): void {
    this.panelFocus.set({ kind: 'pipe', operatorIndex });
  }

  onOutputTrackClick(): void {
    this.panelFocus.set({ kind: 'output' });
  }

  onPipeClick(): void {
    this.panelFocus.set({ kind: 'pipe' });
  }

  // CRUD

  onRemoveOperator(index: number): void {
    // Docelowo: mutacja przez serwis/store
    console.log('remove operator', index);
    this.challangeStateService.removeOperator(index);
  }

  onOperatorConfirmed(operator: PipeOperator): void {
    console.log('operator confirmed', operator);
    this.panelFocus.set(null);
    this.challangeStateService.addOperator(operator);
  }

  onAddSourceStream(): void {
    // Docelowo: dodaj nowy pustry StreamData do listy źródeł
    console.log('add source stream');
    this.challangeStateService.addSourceStream();
  }

  onRemoveSourceStream(index: number): void {
    // Docelowo: dodaj nowy pustry StreamData do listy źródeł
    console.log('add source stream');
    this.challangeStateService.removeSourceStream(index);
  }

  //------ DataForm controlers -----------------
  onMarbleAdded(event: { streamIndex: number; event: StreamEvent }): void {
    // Docelowo: mutacja przez serwis/store
    console.log('marble added', event);
    this.challangeStateService.addMarble(event.streamIndex, event.event);
  }

  onMarbleRemoved(event: { streamIndex: number; marbleIndex: number }): void {
    console.log('marble removed', event);
    this.challangeStateService.removeMarble(
      event.streamIndex,
      event.marbleIndex,
    );
  }

  onMarbleMoved(
    streamIndex: number,
    event: { index: number; newTime: number },
  ): void {
    console.log('marble moved', streamIndex, event);
    this.challangeStateService.moveMarble(streamIndex, event);
  }

  //------- Checking answer -----------

  checkAnswer(): void {
    // Placeholder — tu trafi interpreter porównujący output z oczekiwanym
    this.feedback.set({
      type: 'hint',
      message: 'Interpreter w budowie. Sprawdź konsolę.',
    });
    setTimeout(() => this.feedback.set(null), 3000);
  }

  // cleanup

  ngOnDestroy(): void {
    this.stopPlay();
  }
}
