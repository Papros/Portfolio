import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TimeValue } from '../types/types';

type ClockMode = 'hours' | 'minutes';
 
const CX = 150;
const CY = 150;
const R_OUTER = 118;
const R_INNER = 80;
const THUMB_R = 18;
const SVG_SIZE = 300;
 
interface FaceItem {
  label: string;
  x: number;
  y: number;
  selected: boolean;
  inner: boolean;
}

@Component({
  selector: 'pipr-time-clock',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-clock.component.html',
  styleUrl: './time-clock.component.scss',
})
export class TimeClockComponent implements OnChanges {
  @Input() value: TimeValue | null = null;
  @Input() disabled = false;
  @Input() use12h = false;
 
  @Output() timeChange = new EventEmitter<TimeValue>();
  @Output() touched = new EventEmitter<void>();
 
  readonly cx = CX;
  readonly cy = CY;
  readonly thumbR = THUMB_R;
  readonly size = SVG_SIZE;
 
  mode = signal<ClockMode>('hours');
  ampm = signal<'AM' | 'PM'>('AM');
  hoverPos = signal<{ x: number; y: number } | null>(null);
 
  private _hours = signal(0);
  private _minutes = signal(0);
 
  hoursDisplay = computed(() => {
    const h = this._hours();
    return String(this.use12h ? (h % 12 || 12) : h).padStart(2, '0');
  });
 
  minutesDisplay = computed(() => String(this._minutes()).padStart(2, '0'));
 
  private handAngle = computed(() => {
    if (this.mode() === 'hours') {
      return ((this._hours() % 12) / 12) * 360;
    }
    return (this._minutes() / 60) * 360;
  });
 
  private handRadius = computed(() => {
    if (this.mode() === 'hours' && !this.use12h && this._hours() >= 12) {
      return R_INNER;
    }
    return R_OUTER;
  });
 
  handX = computed(() => CX + this.handRadius() * Math.sin((this.handAngle() * Math.PI) / 180));
  handY = computed(() => CY - this.handRadius() * Math.cos((this.handAngle() * Math.PI) / 180));
 
  faceItems = computed((): FaceItem[] => {
    if (this.mode() === 'hours') {
      return this.use12h ? this.build12hItems() : this.build24hItems();
    }
    return this.buildMinuteItems();
  });
 
  ngOnChanges(): void {
    if (this.value) {
      this._hours.set(this.value.hours);
      this._minutes.set(this.value.minutes);
      this.ampm.set(this.value.hours < 12 ? 'AM' : 'PM');
    }
  }
 
  onFaceClick(event: MouseEvent): void {
    if (this.disabled) return;
    this.applyFromEvent(event);
    this.touched.emit();
    if (this.mode() === 'hours') {
      this.mode.set('minutes');
    }
  }
 
  onFaceHover(event: MouseEvent): void {
    if (this.disabled) return;
    const { angle, inner } = this.pickFromEvent(event);
    const r = inner ? R_INNER : R_OUTER;
    this.hoverPos.set({
      x: CX + r * Math.sin((angle * Math.PI) / 180),
      y: CY - r * Math.cos((angle * Math.PI) / 180),
    });
  }
 
  setAmPm(val: 'AM' | 'PM'): void {
    this.ampm.set(val);
    let h = this._hours();
    if (val === 'AM' && h >= 12) h -= 12;
    if (val === 'PM' && h < 12) h += 12;
    this._hours.set(h);
    this.emit();
  }
 
  private applyFromEvent(event: MouseEvent): void {
    const { angle, inner } = this.pickFromEvent(event);
 
    if (this.mode() === 'hours') {
      let h = Math.round((angle / 360) * 12) % 12;
      if (!this.use12h && inner) h += 12;
      if (this.use12h && this.ampm() === 'PM') h += 12;
      this._hours.set(h);
    } else {
      this._minutes.set(Math.round((angle / 360) * 60) % 60);
    }
    this.emit();
  }
 
  private pickFromEvent(event: MouseEvent): { angle: number; inner: boolean } {
    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    const scaleX = SVG_SIZE / rect.width;
    const scaleY = SVG_SIZE / rect.height;
    const dx = (event.clientX - rect.left) * scaleX - CX;
    const dy = (event.clientY - rect.top) * scaleY - CY;
    let angle = Math.atan2(dx, -dy) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const inner = Math.abs(dist - R_INNER) < Math.abs(dist - R_OUTER);
    return { angle, inner };
  }
 
  private build12hItems(): FaceItem[] {
    return Array.from({ length: 12 }, (_, i) => {
      const h = i === 0 ? 12 : i;
      const angle = (i / 12) * 360;
      return {
        label: String(h),
        x: CX + R_OUTER * Math.sin((angle * Math.PI) / 180),
        y: CY - R_OUTER * Math.cos((angle * Math.PI) / 180),
        selected: (this._hours() % 12 || 12) === h,
        inner: false,
      };
    });
  }
 
  private build24hItems(): FaceItem[] {
    const outer: FaceItem[] = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * 360;
      return {
        label: String(i).padStart(2, '0'),
        x: CX + R_OUTER * Math.sin((angle * Math.PI) / 180),
        y: CY - R_OUTER * Math.cos((angle * Math.PI) / 180),
        selected: this._hours() === i,
        inner: false,
      };
    });
 
    const inner: FaceItem[] = Array.from({ length: 12 }, (_, i) => {
      const h = i + 12;
      const angle = (i / 12) * 360;
      return {
        label: String(h).padStart(2, '0'),
        x: CX + R_INNER * Math.sin((angle * Math.PI) / 180),
        y: CY - R_INNER * Math.cos((angle * Math.PI) / 180),
        selected: this._hours() === h,
        inner: true,
      };
    });
 
    return [...outer, ...inner];
  }
 
  private buildMinuteItems(): FaceItem[] {
    return Array.from({ length: 12 }, (_, i) => {
      const min = i * 5;
      const angle = (i / 12) * 360;
      return {
        label: String(min).padStart(2, '0'),
        x: CX + R_OUTER * Math.sin((angle * Math.PI) / 180),
        y: CY - R_OUTER * Math.cos((angle * Math.PI) / 180),
        selected: (Math.round(this._minutes() / 5) * 5) % 60 === min,
        inner: false,
      };
    });
  }
 
  private emit(): void {
    this.timeChange.emit({ hours: this._hours(), minutes: this._minutes() });
  }
}