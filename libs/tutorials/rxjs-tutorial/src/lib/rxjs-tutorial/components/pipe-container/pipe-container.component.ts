import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeOperator } from '../../interfaces/challenge.interface';

@Component({
  selector: 'lib-pipe-container',
  imports: [CommonModule],
  templateUrl: './pipe-container.component.html',
  styleUrl: './pipe-container.component.scss',
})
export class PipeContainerComponent {
  //Interface
  operators = input<PipeOperator[]>([]);
  isFocused = input<boolean>(false);

  operatorClick = output<number>();
  addOperator = output<void>();
  removeOperator = output<number>();
  pipeClick = output<void>();

  // Local state
  focusedOperatorIndex = signal<number | null>(null);

  onOperatorClick(event: MouseEvent, index: number): void {
    event.stopPropagation();
    if (this.operators()[index].locked) return;
    this.focusedOperatorIndex.set(index);
    this.operatorClick.emit(index);
  }

  onAddOperatorClick(event: MouseEvent): void {
    event.stopPropagation();
    this.addOperator.emit();
  }

  onRemoveOperator(event: MouseEvent, index: number): void {
    event.stopPropagation();
    this.focusedOperatorIndex.set(null);
    this.removeOperator.emit(index);
  }
}
