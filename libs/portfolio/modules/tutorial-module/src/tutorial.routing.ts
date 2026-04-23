import { Routes } from '@angular/router';
import { ChallengeContainerComponent } from '@portfolio/rxjs-tutorial';

export const TUTORIAL_ROUTES: Routes = [
  {
    path: '',
    component: ChallengeContainerComponent,
  },
  // {
  //   path: 'rxjs',
  //   loadComponent: () => import('./')
  // }
];
