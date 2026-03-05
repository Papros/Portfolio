import { Observable } from 'rxjs';

export abstract class DocsSourceStrategy {
  abstract getSource(
    componentId: string,
    exampleId: string,
    fileType: 'ts' | 'html' | 'scss',
  ): Observable<string>;
}
