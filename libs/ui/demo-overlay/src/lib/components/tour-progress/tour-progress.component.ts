import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pipr-tour-progress',
  imports: [CommonModule],
  templateUrl: './tour-progress.component.html',
  styleUrl: './tour-progress.component.scss',
})
export class TourProgressComponent {
  readonly current = input.required<number>();
  readonly total = input.required<number>();
  readonly progress = input.required<number>();

  get dots(): unknown[] {
    return Array.from({ length: this.total() });
  }
}
