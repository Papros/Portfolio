import { Inject, Injectable } from '@angular/core';
import { DOCS_SOURCE_STRATEGY } from './docs-source.token';
import { DocsSourceStrategy } from './strategies/docs-source.strategy';
import { shareReplay } from 'rxjs';

@Injectable()
export class DocsSourceFacade {
  constructor(
    @Inject(DOCS_SOURCE_STRATEGY)
    private strategy: DocsSourceStrategy,
  ) {}

  getSource(
    componentId: string,
    exampleId: string,
    fileType: 'ts' | 'html' | 'scss',
  ) {
    return this.strategy
      .getSource(componentId, exampleId, fileType)
      .pipe(shareReplay(1));
  }
}
