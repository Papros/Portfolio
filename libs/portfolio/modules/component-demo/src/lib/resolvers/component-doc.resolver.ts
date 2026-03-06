import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { COMPONENT_DOC_MAP, ComponentDoc } from '@docs-model';

export const componentDocResolver: ResolveFn<ComponentDoc> = (route) => {
  const router = inject(Router);

  const id = route.paramMap.get('component');
  const doc = COMPONENT_DOC_MAP.get(id ?? '');

  if (!doc) {
    router.navigate(['/components']);
    throw new Error('Component not found');
  }

  return doc;
};
