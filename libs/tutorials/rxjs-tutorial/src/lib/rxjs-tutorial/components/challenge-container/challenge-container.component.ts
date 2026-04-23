import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarbleTrackComponent } from '../marble-track/marble-track.component';
import { RxJSChallenge } from '../../interfaces/challange.interface';
import { MatSliderModule } from '@angular/material/slider';
import { PipeContainerComponent } from '../pipe-container/pipe-container.component';

@Component({
  selector: 'lib-challenge-container',
  imports: [
    CommonModule,
    MarbleTrackComponent,
    MatSliderModule,
    PipeContainerComponent,
  ],
  templateUrl: './challenge-container.component.html',
  styleUrl: './challenge-container.component.scss',
})
export class ChallengeContainerComponent {
  timeValue = signal<number>(0);
  challengeData: RxJSChallenge = {
    id: 0,
    title: 'Test',
    subtitle: 'testing components inputs',
    data: {
      sourceStream: [
        {
          label: 'Input1',
          stream: [
            { timeInterval: 5, label: '1' },
            { timeInterval: 10, label: '2' },
            { timeInterval: 15, label: '3' },
            { timeInterval: 30, label: '4' },
            { timeInterval: 60, label: '5' },
            { timeInterval: 90, label: '6' },
          ],
          completeTime: 0,
        },
        {
          label: 'Input2',
          stream: [
            { timeInterval: 5, label: '1' },
            { timeInterval: 10, label: '2' },
            { timeInterval: 30, label: '4' },
            { timeInterval: 60, label: '5' },
          ],
          completeTime: 0,
        },
      ],
      pipe: [
        {
          operator: 'filter',
          code: 'return data % 2 == 0;',
        },
      ],
      outputStream: {
        label: 'Output',
        stream: [
          { timeInterval: 10, label: '2' },
          { timeInterval: 30, label: '4' },
          { timeInterval: 90, label: '6' },
        ],
        completeTime: 0,
      },
    },
  };

  onSliderChange(value: number) {
    this.timeValue.set(value);
  }
}
