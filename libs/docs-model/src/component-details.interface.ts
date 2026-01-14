import { Type } from '@angular/core';

export interface ComponentDoc {
  id: string;
  title: string;
  description: string;
  overview: DocArticle;
  api: {
    inputs: DocApiProperty[];
    outputs: DocApiProperty[];
  };
  examples: DocExample[];
}

export type DocSection =
  | DocMarkdownSection
  | DocExampleSection
  | DocCodeSection;

export interface DocApiProperty {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ExampleDef {
  title: string;
  description: string;
  component: Type<unknown>;
  code?: {
    ts?: string;
    html?: string;
    scss?: string;
  };
}

export interface DocArticle {
  sections: DocSection[];
}

export interface DocMarkdownSection {
  type: 'markdown';
  id: string; // anchor
  title: string; // TOC
  content: string; // markdown
}

export interface DocExampleSection {
  type: 'example';
  id: string;
  title: string;
  description?: string;
  example: DocExample;
}

export interface DocCodeSection {
  type: 'code';
  id: string;
  title: string;
  language: 'html' | 'ts' | 'scss';
  code: string;
}

export interface DocExample {
  title: string;
  description: string;
  component: Type<unknown>;
  source?: {
    html?: string;
    ts?: string;
    scss?: string;
  };
}
