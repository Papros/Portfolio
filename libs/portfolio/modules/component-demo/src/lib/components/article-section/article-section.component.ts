import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocArticleSection } from '@docs-model';

@Component({
  selector: 'lib-article-section',
  standalone: false,
  templateUrl: './article-section.component.html',
  styleUrl: './article-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSectionComponent {
  @Input() componentId!: string;
  @Input() section: DocArticleSection | null = null;
}
