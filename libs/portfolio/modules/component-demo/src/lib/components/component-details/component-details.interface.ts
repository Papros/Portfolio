import { Type } from '@angular/core';

export interface ComponentDoc {
  id: string;
  title: string;
  description: string;

  overview: {
    markdown: string;
  };

  api: {
    inputs: DocApiProperty[];
    outputs: DocApiProperty[];
  };

  examples: ExampleDef[];
}

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
}
