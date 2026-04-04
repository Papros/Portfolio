import { Component, Input, OnChanges } from '@angular/core';
import { DocExample } from '@docs-model';
import { DocsSourceFacade } from '@portfolio/component-docs-data-access';
import {
  map,
  catchError,
  shareReplay,
  of,
  Observable,
  startWith,
  take,
  takeUntil,
  filter,
  timeout,
  EMPTY,
} from 'rxjs';
import { CodeState } from './code-block.interface';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotificationService } from '@portfolio/notification';

@Component({
  selector: 'lib-code-block',
  standalone: false,
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent implements OnChanges {
  @Input() componentId!: string;
  @Input() example: DocExample | null = null;
  @Input() lazy = true;

  isCodeVisible = false;
  activeFileType: 'html' | 'ts' | 'scss' = 'html';

  private stateCache = new Map<string, Observable<CodeState>>();

  constructor(
    private docsFacade: DocsSourceFacade,
    private clipboard: Clipboard,
    private notificationService: NotificationService,
  ) {}

  ngOnChanges() {
    this.isCodeVisible = false;
    this.activeFileType = 'html';
    this.stateCache.clear();
  }

  toggleCodeVisibility() {
    this.isCodeVisible = !this.isCodeVisible;
  }

  getCode(fileType: 'ts' | 'html' | 'scss'): Observable<CodeState> {
    if (!this.example || !this.componentId) {
      return of({ loading: false, error: true });
    }

    const sourceExists = this.example.source?.[fileType];
    if (!sourceExists) {
      return of({ loading: false, error: true });
    }

    if (!this.stateCache.has(fileType)) {
      const state$ = this.docsFacade
        .getSource(this.componentId, this.example.id, fileType)
        .pipe(
          map((code): CodeState => ({ loading: false, code })),
          startWith<CodeState>({ loading: true }),
          catchError(() => of<CodeState>({ loading: false, error: true })),
          shareReplay(1),
        );

      this.stateCache.set(fileType, state$);
    }

    const cached = this.stateCache.get(fileType);
    if (!cached) {
      return of({ loading: false, error: true });
    }

    return cached;
  }

  onTabChange(index: number) {
    const map: ('html' | 'ts' | 'scss')[] = ['html', 'ts', 'scss'];
    this.activeFileType = map[index];
  }

  copyCode() {
    this.getCode(this.activeFileType)
      .pipe(
        filter((state) => !state.loading),
        take(1),
        timeout(10000),
        catchError(() => {
          this.notificationService.error(
            'Failed to copy - code not available.',
          );
          return EMPTY;
        }),
      )
      .subscribe((state) => {
        if (state.code) {
          this.clipboard.copy(state.code);
          this.notificationService.info('Code copied into clipboard!');
        }
      });
  }
}
