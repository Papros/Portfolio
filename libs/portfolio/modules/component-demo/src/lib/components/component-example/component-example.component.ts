import { Component, Input } from '@angular/core';
import { DocExample } from '@docs-model';

@Component({
  selector: 'lib-component-example',
  standalone: false,
  templateUrl: './component-example.component.html',
  styleUrl: './component-example.component.scss',
})
export class ComponentExampleComponent {
  @Input() examples: DocExample[] = [];
}
