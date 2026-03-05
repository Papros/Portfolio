import { InjectionToken } from '@angular/core';
import { DocsSourceStrategy } from './strategies/docs-source.strategy';

export const DOCS_SOURCE_STRATEGY = new InjectionToken<DocsSourceStrategy>(
  'DOCS_SOURCE_STRATEGY',
);
