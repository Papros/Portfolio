import { Component, Input } from '@angular/core';
import { DocExample } from '@docs-model';

@Component({
  selector: 'lib-code-block',
  standalone: false,
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  @Input()
  example: DocExample | null = null;

  isCodeVisible = false;

  toggleCodeVisibility() {
    this.isCodeVisible = !this.isCodeVisible;
  }

  isCodeUrl(source: string | null): boolean {
    return (
      source !== null &&
      (source.startsWith('http://') || source.startsWith('https://'))
    );
  }
}
