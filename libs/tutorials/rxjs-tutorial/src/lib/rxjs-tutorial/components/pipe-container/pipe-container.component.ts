import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeOperator } from '../../interfaces/challange.interface';

@Component({
  selector: 'lib-pipe-container',
  imports: [CommonModule],
  templateUrl: './pipe-container.component.html',
  styleUrl: './pipe-container.component.scss',
})
export class PipeContainerComponent {
  operators = input<PipeOperator[]>([]);
}
