import { HttpClient } from '@angular/common/http';
import { DocsSourceStrategy } from './docs-source.strategy';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class ApiDocsSourceStrategy implements DocsSourceStrategy {
  constructor(private http: HttpClient) {}

  getSource(
    componentId: string,
    exampleId: string,
    fileType: 'ts' | 'html' | 'scss',
  ) {
    // No Java SpringBoot backend yet, returning mocked data for now
    return of('// Mocked source code for ' + componentId + '.' + fileType);
  }
}
