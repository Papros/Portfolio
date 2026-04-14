import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnChanges,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { TimeInputComponent } from '../time-input/time-input.component';
import { TimeClockComponent } from '../time-clock/time-clock.component';
import { TimeScrollComponent } from '../time-scroll/time-scroll.component';
import {
  applyTimeToDate,
  dateToTimeValue,
  TimePickerVariant,
  TimeValue,
} from '../types/types';

@Component({
  selector: 'pipr-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    TimeInputComponent,
    TimeClockComponent,
    TimeScrollComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './date-time-picker.component.html',
  styleUrl: './date-time-picker.component.scss'
})
export class DateTimePickerComponent implements ControlValueAccessor {
  // --- Public API (static config → @Input, not signals) ---

  /** Visual variant of the picker */
  @Input() variant: TimePickerVariant = 'input';

  /** Label for input variant */
  @Input() label = 'Time';

  /** mat-form-field appearance for input variant */
  @Input() appearance: 'fill' | 'outline' = 'outline';

  /** Use 12-hour mode (clock variant) */
  @Input() use12h = false;

  /** Minute step (scroll variant) */
  @Input() minuteStep = 1;

  /** Min allowed time */
  @Input() minTime: TimeValue | null = null;

  /** Max allowed time */
  @Input() maxTime: TimeValue | null = null;

  // --- Internal reactive state ---

  /** The raw Date value coming from FormControl */
  private _date = signal<Date | null>(null);

  /** TimeValue derived from the Date — what variants consume */
  timeValue = signal<TimeValue | null>(null);

  /** Disabled state from FormControl */
  isDisabled = signal(false);

  // --- CVA callbacks ---
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: Date | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  // --- CVA implementation ---

  writeValue(value: Date | null): void {
    this._date.set(value);
    this.timeValue.set(value ? dateToTimeValue(value) : null);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  // --- Internal handlers ---

  onTimeChange(time: TimeValue): void {
    this.timeValue.set(time);
    const updated = applyTimeToDate(this._date(), time);
    this._date.set(updated);
    this._onChange(updated);
  }
}
