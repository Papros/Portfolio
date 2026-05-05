import { Routes } from '@angular/router';
import { ChallengeResolver } from './lib/rxjs-tutorial/routing/challenge.resolver';
import { RxjsTutorialPageComponent } from './lib/rxjs-tutorial/routing/tutorial-page/rxjs-tutorial-page.component';
import { ChallengeStateService } from './lib/rxjs-tutorial/service/challenge-state.service';
import { ChallengeControlResolver } from './lib/rxjs-tutorial/routing/challenge-control.resolver';

export const RXJS_TUTORIAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '1',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: RxjsTutorialPageComponent,
    resolve: { challenge: ChallengeResolver, meta: ChallengeControlResolver },
    providers: [ChallengeStateService],
  },
];
