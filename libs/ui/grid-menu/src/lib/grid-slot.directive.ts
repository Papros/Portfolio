import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[libGridSlot]' })
export class GridSlotDirective {
  @Input() libGridSlot!: string;

  constructor(public tpl: TemplateRef<any>, public vc: ViewContainerRef) {}
}
