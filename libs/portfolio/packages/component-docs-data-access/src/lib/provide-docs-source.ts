import { DOCS_SOURCE_STRATEGY } from './docs-source.token';
import { ApiDocsSourceStrategy } from './strategies/api-docs-source.strategy';
import { GithubDocsSourceStrategy } from './strategies/github-docs-source.strategy';

export function provideGithubDocsSource() {
  return {
    provide: DOCS_SOURCE_STRATEGY,
    useClass: GithubDocsSourceStrategy,
  };
}

export function provideApiDocsSource() {
  return {
    provide: DOCS_SOURCE_STRATEGY,
    useClass: ApiDocsSourceStrategy,
  };
}
