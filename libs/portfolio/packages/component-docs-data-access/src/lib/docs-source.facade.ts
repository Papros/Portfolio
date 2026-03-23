import { Inject, Injectable } from '@angular/core';
import { DOCS_SOURCE_STRATEGY } from './docs-source.token';
import { DocsSourceStrategy } from './strategies/docs-source.strategy';
import { Observable, shareReplay, throwError } from 'rxjs';

@Injectable()
export class DocsSourceFacade {
  private cache = new Map<string, Observable<string>>();

  constructor(
    @Inject(DOCS_SOURCE_STRATEGY)
    private strategy: DocsSourceStrategy,
  ) {}

  getSource(
    componentId: string,
    exampleId: string,
    fileType: 'ts' | 'html' | 'scss',
  ) {
    const key = `${componentId}:${exampleId}:${fileType}`;

    if (!this.cache.has(key)) {
      const request$ = this.strategy
        .getSource(componentId, exampleId, fileType)
        .pipe(shareReplay(1));

      this.cache.set(key, request$);
    }

    const cached = this.cache.get(key);
    if (!cached) {
      return throwError(() => new Error(`Cache miss for key: ${key}`));
    }

    return cached;
  }
}
