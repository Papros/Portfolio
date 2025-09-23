import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLabelOptions, GridMenuConfig } from './grid-menu.interface';
import { GridSlotDirective } from './grid-slot.directive';

@Component({
  selector: 'lib-grid-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-menu.component.html',
  styleUrl: './grid-menu.component.scss',
})
export class GridMenuComponent implements AfterContentInit {
  @ContentChildren(GridSlotDirective) slots!: QueryList<GridSlotDirective>;

  @Input()
  menuConfig: GridMenuConfig = { items: [], gridHeight: 5, gridWidth: 5 };

  private slotMap = new Map<string, GridSlotDirective>();

  ngAfterContentInit(): void {
    this.slots.forEach((slot) => this.slotMap.set(slot.libGridSlot, slot));
    console.log(this.slotMap);
    console.log(this.slots);
  }

  getSlotTemplate(id: string) {
    return this.slotMap.get(id)?.tpl ?? null;
  }

  mapHorizontal(option: GridLabelOptions): string {
    switch (option) {
      case GridLabelOptions.START:
        return 'start';
      case GridLabelOptions.CENTER:
        return 'center';
      case GridLabelOptions.END:
        return 'end';
      default:
        return 'center';
    }
  }

  mapVertical(option: GridLabelOptions): string {
    switch (option) {
      case GridLabelOptions.START:
        return 'start';
      case GridLabelOptions.CENTER:
        return 'center';
      case GridLabelOptions.END:
        return 'end';
      default:
        return 'center';
    }
  }
}
