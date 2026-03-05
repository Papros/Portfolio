import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocsSourceStrategy } from './docs-source.strategy';
import { map } from 'rxjs';

@Injectable()
export class GithubDocsSourceStrategy implements DocsSourceStrategy {
  constructor(private http: HttpClient) {}

  getSource(
    componentId: string,
    exampleId: string,
    fileType: 'ts' | 'html' | 'scss',
  ) {
    console.log('fetching data from git');
    const url = this.buildUrl(componentId, exampleId, fileType);
    return this.http
      .get<any>(url)
      .pipe(map((response) => atob(response.content)));
  }

  private buildUrl(id: string, exampleId: string, type: string) {
    return `https://api.github.com/repos/Papros/Portfolio/contents/libs/docs/${id}/${exampleId}/${exampleId}.example.component.${type}`;
  }
}
