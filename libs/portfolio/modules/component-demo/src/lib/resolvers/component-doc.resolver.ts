import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { COMPONENT_REGISTRY, ComponentDoc } from '@docs-model';
import { from } from 'rxjs';

export const componentDocResolver: ResolveFn<ComponentDoc> = (route) => {
  const router = inject(Router);
  const id = route.paramMap.get('component') ?? '';

  const loader = COMPONENT_REGISTRY[id];

  if (!loader) {
    router.navigate(['/components']);
    throw new Error('Component not found');
  }

  return from(loader());
};
