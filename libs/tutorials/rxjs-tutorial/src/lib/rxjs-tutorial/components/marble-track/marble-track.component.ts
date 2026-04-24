import {
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamData } from '../../interfaces/challenge.interface';

@Component({
  selector: 'lib-marble-track',
  imports: [CommonModule],
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

  //Local state
  focusedMarbleIndex = signal<number | null>(null);
  readonly ticks = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  //Drag&Drop
  @ViewChild('trackArea') trackAreaRef!: ElementRef<HTMLDivElement>;
  private draggingIndex: number | null = null;
  private dragStartX = 0;
  private dragStartTime = 0;

  calcPosition(timeInterval: number): number {
    const max = this.maxTime();
    if (max === 0) return 0;

    return Math.min(100, Math.max(0, (timeInterval / max) * 100));
  }

  onTrackClick(): void {
    if (!this.locked()) {
      this.trackClick.emit();
    }
  }

  onMarbleClick(event: MouseEvent, index: number): void {
    event.stopPropagation();
    this.focusedMarbleIndex.set(index);
    this.marbleClick.emit(index);
  }

  onTrackAreaClick(event: MouseEvent): void {
    if (this.locked() || this.draggingIndex !== null) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const time = Math.round(ratio * this.maxTime());

    const clickedMarble = (event.target as HTMLElement).closest('.marble');
    if (!clickedMarble) {
      this.trackAreaClick.emit(time);
    }
  }

  //Drag&Drop
  onMarbleDragStart(event: MouseEvent, index: number): void {
    if (this.locked()) return;
    event.preventDefault();
    event.stopPropagation();

    this.draggingIndex = index;
    this.dragStartX = event.clientX;
    this.dragStartTime = this.trackData().stream[index].timeInterval;
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
    this.draggingIndex = null;
  }
}
