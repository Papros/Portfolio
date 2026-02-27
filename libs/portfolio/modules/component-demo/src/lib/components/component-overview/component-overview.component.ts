import { Component, Input } from '@angular/core';
import { DocArticle } from '@docs-model';

@Component({
  selector: 'lib-component-overview',
  standalone: false,
  templateUrl: './component-overview.component.html',
  styleUrl: './component-overview.component.scss',
})
export class ComponentOverviewComponent {
  @Input() overview: DocArticle | null = null;
}
