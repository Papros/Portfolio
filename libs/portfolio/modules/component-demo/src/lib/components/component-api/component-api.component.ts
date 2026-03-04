import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocApiProperty } from '@docs-model';

@Component({
  selector: 'lib-component-api',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './component-api.component.html',
  styleUrl: './component-api.component.scss',
})
export class ComponentApiComponent {
  @Input() docApi: {
    inputs: DocApiProperty[];
    outputs: DocApiProperty[];
  } = {
    inputs: [],
    outputs: [],
  };
}
