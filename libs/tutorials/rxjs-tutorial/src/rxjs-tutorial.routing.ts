import { Routes } from '@angular/router';
import { ChallengeResolver } from './lib/rxjs-tutorial/routing/challenge.resolver';
import { RxjsTutorialPageComponent } from './lib/rxjs-tutorial/routing/tutorial-page/rxjs-tutorial-page.component';

export const RXJS_TUTORIAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '1',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: RxjsTutorialPageComponent,
    resolve: { challenge: ChallengeResolver },
  },
];
