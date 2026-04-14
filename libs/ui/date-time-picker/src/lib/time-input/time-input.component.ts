import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TimeValue, timeValueToLabel } from '../types/types'

@Component({
  selector: 'pipr-time-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.scss'
})
export class TimeInputComponent implements OnChanges {
  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  @Input() value: TimeValue | null = null;
  @Input() disabled = false;
  @Input() label = 'Time';
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() min: TimeValue | null = null;
  @Input() max: TimeValue | null = null;

  @Output() timeChange = new EventEmitter<TimeValue>();
  @Output() touched = new EventEmitter<void>();

  displayValue = '';
  error: string | null = null;

  ngOnChanges(): void {
    if (this.value) {
      this.displayValue = timeValueToLabel(this.value);
    } else {
      this.displayValue = '';
    }
  }

  onRawInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let raw = input.value.replace(/[^0-9]/g, '');

    // Auto-insert colon after 2 digits
    if (raw.length >= 2) {
      raw = raw.slice(0, 2) + ':' + raw.slice(2, 4);
    }

    this.displayValue = raw;
    input.value = raw;
    this.error = null;
  }

  onKeydown(event: KeyboardEvent): void {
    // Allow: backspace, delete, tab, arrows
    const allowed = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (allowed.includes(event.key)) return;

    // Allow digits and colon only
    if (!/^[0-9:]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  onBlur(): void {
    this.touched.emit();
    this.parseAndEmit(this.displayValue);
  }

  private parseAndEmit(raw: string): void {
    const match = raw.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) {
      this.error = raw.length ? 'Invalid format (HH:MM)' : null;
      return;
    }

    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    if (hours > 23 || minutes > 59) {
      this.error = 'Invalid time value';
      return;
    }

    const time: TimeValue = { hours, minutes };

    if (this.min && this.toMinutes(time) < this.toMinutes(this.min)) {
      this.error = `Min time is ${timeValueToLabel(this.min)}`;
      return;
    }
    if (this.max && this.toMinutes(time) > this.toMinutes(this.max)) {
      this.error = `Max time is ${timeValueToLabel(this.max)}`;
      return;
    }

    this.error = null;
    this.displayValue = timeValueToLabel(time);
    this.timeChange.emit(time);
  }

  private toMinutes(t: TimeValue): number {
    return t.hours * 60 + t.minutes;
  }
}