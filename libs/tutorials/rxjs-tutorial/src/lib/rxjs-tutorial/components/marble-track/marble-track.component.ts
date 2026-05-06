import {
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamData } from '../../interfaces/challenge.interface';
import { MatIconModule } from '@angular/material/icon';

interface Tick {
  pct: number; // pozycja w % szerokości toru
  label: string; // label czasu np. "50"
}

@Component({
  selector: 'lib-marble-track',
  imports: [CommonModule, MatIconModule],
  templateUrl: './marble-track.component.html',
  styleUrl: './marble-track.component.scss',
})
export class MarbleTrackComponent {
  //Component interface
  trackData = input<StreamData>({ label: '', stream: [], completeTime: null });
  simulatedTime = input<number>(0);
  maxTime = input<number>(100);
  locked = input<boolean>(false);
  isFocused = input<boolean>(false);

  trackClick = output<void>();
  marbleClick = output<number>();
  trackAreaClick = output<number>();
  marbleMoved = output<{ index: number; newTime: number }>();
  marbleDragEnd = output<number>();
  trackRemoved = output<void>();

  //Local state
  focusedMarbleIndex = signal<number | null>(null);
  readonly ticks = computed<Tick[]>(() => {
    const max = this.maxTime();
    return [10, 20, 30, 40, 50, 60, 70, 80, 90].map((pct) => ({
      pct,
      label: String(Math.round((pct / 100) * max)),
    }));
  });

  readonly elapsedPercent = computed(() => {
    const pct = Math.min(100, (this.simulatedTime() / this.maxTime()) * 100);
    return `${pct.toFixed(1)}%`;
  });

  //Drag&Drop
  @ViewChild('trackArea') trackAreaRef!: ElementRef<HTMLDivElement>;
  private draggingIndex: number | null = null;
  private dragStartTime = 0;

  calcPosition(timeInterval: number): number {
    const max = this.maxTime();
    if (max === 0) return 0;
    return Math.min(100, Math.max(0, (timeInterval / max) * 100));
  }

  onTrackClick(): void {
    if (!this.locked()) this.trackClick.emit();
  }

  onMarbleClick(event: MouseEvent, index: number): void {
    event.stopPropagation();
    this.focusedMarbleIndex.set(index);
    this.marbleClick.emit(index);
  }

  onRemoveTrack(event: MouseEvent) {
    event.stopPropagation();
    this.trackRemoved.emit();
  }

  onTrackAreaClick(event: MouseEvent): void {
    if (this.locked() || this.draggingIndex !== null) return;
    const clickedMarble = (event.target as HTMLElement).closest('.marble');
    if (clickedMarble) return;

    event.stopPropagation();

    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const time = Math.round(Math.min(1, Math.max(0, ratio)) * this.maxTime());
    this.trackAreaClick.emit(time);
  }

  //Drag&Drop
  onMarbleDragStart(event: MouseEvent, index: number): void {
    if (this.locked()) return;
    event.preventDefault();
    event.stopPropagation();
    this.draggingIndex = index;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.draggingIndex === null) return;
    const area = this.trackAreaRef?.nativeElement;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    const newTime = Math.round(ratio * this.maxTime());
    this.marbleMoved.emit({ index: this.draggingIndex, newTime });
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.draggingIndex !== null) {
      this.marbleDragEnd.emit(this.draggingIndex);
    }
    this.draggingIndex = null;
  }
}
