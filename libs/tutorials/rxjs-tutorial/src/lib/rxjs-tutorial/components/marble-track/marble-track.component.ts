import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamData } from '../../interfaces/challange.interface';

@Component({
  selector: 'lib-marble-track',
  imports: [CommonModule],
  templateUrl: './marble-track.component.html',
  styleUrl: './marble-track.component.scss',
})
export class MarbleTrackComponent {
  trackData = input<StreamData>({ label: '', stream: [], completeTime: -1 });
  simulatedTime = input<number>(0);
  maxTime = input<number>(0);

  @Output()
  trackSelected = new EventEmitter<number>();

  calcPosition(interval: number) {
    return (interval / this.maxTime()) * 100;
  }
}
