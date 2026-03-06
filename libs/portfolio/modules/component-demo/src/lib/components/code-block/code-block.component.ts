import { Component, Input } from '@angular/core';
import { DocExample } from '@docs-model';
import { DocsSourceFacade } from '@portfolio/component-docs-data-access';
import { map, catchError, shareReplay, of, Observable, startWith } from 'rxjs';
import { CodeState } from './code-block.interface';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'lib-code-block',
  standalone: false,
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  @Input() componentId!: string;

  @Input()
  example: DocExample | null = null;

  @Input() lazy = true;

  isCodeVisible = false;
  activeFileType: 'html' | 'ts' | 'scss' = 'html';

  private cache = new Map<string, Observable<CodeState>>();

  constructor(
    private docsFacade: DocsSourceFacade,
    private clipboard: Clipboard,
  ) {}

  toggleCodeVisibility() {
    this.isCodeVisible = !this.isCodeVisible;
  }

  getCode(fileType: 'ts' | 'html' | 'scss'): Observable<CodeState> {
    if (!this.cache.has(fileType) && this.example && this.componentId) {
      const request$ = this.docsFacade
        .getSource(this.componentId, this.example.id, fileType)
        .pipe(
          map((code) => ({ loading: false, code })),
          startWith({ loading: true }),
          catchError(() => of({ loading: false, error: true })),
          shareReplay(1),
        );

      this.cache.set(fileType, request$);
    }

    return this.cache.get(fileType) ?? of({ loading: false, error: true });
  }

  onTabChange(index: number) {
    const map: ('html' | 'ts' | 'scss')[] = ['html', 'ts', 'scss'];
    this.activeFileType = map[index];
  }

  copyCode() {
    const code$ = this.getCode(this.activeFileType);

    code$.subscribe((state) => {
      if (state.code) {
        this.clipboard.copy(state.code);
      }
    });
  }
}
