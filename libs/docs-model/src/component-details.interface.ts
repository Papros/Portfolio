import { Type } from '@angular/core';

export interface ComponentDoc {
  id: string;
  meta: ComponentMeta;
  overview: DocArticle;
  api: {
    inputs: DocApiProperty[];
    outputs: DocApiProperty[];
  };
  examples: DocExample[];
}

export interface ComponentMeta {
  title: string;
  description: string;
  thumbnail: string;
}

export type DocArticleSection =
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
    ts?: boolean;
    html?: boolean;
    scss?: boolean;
  };
}

export interface DocArticle {
  sections: DocArticleSection[];
}

export interface DocSection {
  type: string;
  id: string;
  title: string;
}

export interface DocMarkdownSection extends DocSection {
  type: 'markdown';
  content: string; // markdown
}

export interface DocExampleSection extends DocSection {
  type: 'example';
  description?: string;
  example: DocExample;
}

export interface DocCodeSection extends DocSection {
  type: 'code';
  language: 'html' | 'ts' | 'scss';
  code: string;
}

export interface DocExample {
  title: string;
  id: string;
  description: string;
  component: Type<unknown>;
  source?: {
    html?: boolean;
    ts?: boolean;
    scss?: boolean;
  };
}
