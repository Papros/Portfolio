import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeValue } from '../types/types';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5; // odd number — selected is center

@Component({
  selector: 'pipr-time-scroll',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-scroll.component.html',
  styleUrl: './time-scroll.component.scss',
})
export class TimeScrollComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChildren('hoursDrum') hoursDrumRef!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('minutesDrum') minutesDrumRef!: QueryList<ElementRef<HTMLDivElement>>;

  @Input() value: TimeValue | null = null;
  @Input() disabled = false;
  @Input() minuteStep = 1;

  @Output() timeChange = new EventEmitter<TimeValue>();
  @Output() touched = new EventEmitter<void>();

  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes: number[] = [];

  selectedHours = signal(0);
  selectedMinutes = signal(0);

  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnChanges(): void {
    this.minutes = Array.from(
      { length: Math.ceil(60 / this.minuteStep) },
      (_, i) => i * this.minuteStep
    );

    if (this.value) {
      this.selectedHours.set(this.value.hours);
      this.selectedMinutes.set(this.value.minutes);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.syncScrollPositions(), 0);
  }

  ngOnDestroy(): void {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
  }

  onHoursScroll(event: Event): void {
    this.touched.emit();
    this.onDrumScroll(event, 24, (val) => {
      this.selectedHours.set(val);
      this.emit();
    });
  }

  onMinutesScroll(event: Event): void {
    this.touched.emit();
    this.onDrumScroll(event, this.minutes.length, (idx) => {
      this.selectedMinutes.set(this.minutes[idx]);
      this.emit();
    });
  }

  scrollToHour(h: number): void {
    this.selectedHours.set(h);
    const drum = this.hoursDrumRef.first?.nativeElement;
    if (drum) drum.scrollTo({ top: h * ITEM_HEIGHT, behavior: 'smooth' });
    this.emit();
  }

  scrollToMinute(m: number): void {
    this.selectedMinutes.set(m);
    const idx = this.minutes.indexOf(m);
    const drum = this.minutesDrumRef.first?.nativeElement;
    if (drum) drum.scrollTo({ top: idx * ITEM_HEIGHT, behavior: 'smooth' });
    this.emit();
  }

  private onDrumScroll(
    event: Event,
    total: number,
    apply: (index: number) => void
  ): void {
    const drum = event.target as HTMLDivElement;

    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

    // Debounce — fire after scroll settles
    this.scrollTimeout = setTimeout(() => {
      const index = Math.round(drum.scrollTop / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(total - 1, index));
      drum.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' });
      this.ngZone.run(() => apply(clamped));
    }, 150);
  }

  private syncScrollPositions(): void {
    const hoursDrum = this.hoursDrumRef.first?.nativeElement;
    const minutesDrum = this.minutesDrumRef.first?.nativeElement;

    if (hoursDrum) {
      hoursDrum.scrollTop = this.selectedHours() * ITEM_HEIGHT;
    }
    if (minutesDrum) {
      const idx = this.minutes.indexOf(this.selectedMinutes());
      minutesDrum.scrollTop = (idx >= 0 ? idx : 0) * ITEM_HEIGHT;
    }
  }

  private emit(): void {
    this.timeChange.emit({
      hours: this.selectedHours(),
      minutes: this.selectedMinutes(),
    });
  }
}