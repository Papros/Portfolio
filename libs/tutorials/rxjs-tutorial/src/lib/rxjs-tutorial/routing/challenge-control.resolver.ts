import { ResolveFn } from '@angular/router';
import { ChallengeMeta } from '../interfaces/challenge.interface';
import { ALL_CHALLENGES } from '../mock/challenge.mock';

export const ChallengeControlResolver: ResolveFn<{
  next?: ChallengeMeta;
  prev?: ChallengeMeta;
}> = (route) => {
  const id = Number(route.paramMap.get('id'));

  const prev = ALL_CHALLENGES.find((c) => c.id === id - 1);
  const next = ALL_CHALLENGES.find((c) => c.id === id + 1);

  return {
    next: next ? { id: next.id, label: next.title } : undefined,
    prev: prev ? { id: prev.id, label: prev.title } : undefined,
  };
};
