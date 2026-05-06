import { ResolveFn } from '@angular/router';
import { RxJSChallenge } from '../interfaces/challenge.interface';
import { ALL_CHALLENGES } from '../mock/challenge.mock';

export const ChallengeResolver: ResolveFn<RxJSChallenge> = (route) => {
  const id = Number(route.paramMap.get('id'));
  return ALL_CHALLENGES.find((c) => c.id === id) ?? ALL_CHALLENGES[0];
};
