import { Routes } from '@angular/router';
import { TutorialMenuPageComponent } from './lib/pages/tutorial-menu-page/tutorial-menu-page.component';

export const TUTORIAL_ROUTES: Routes = [
  {
    path: '',
    component: TutorialMenuPageComponent,
  },
  // {
  //   path: 'rxjs',
  //   loadComponent: () => import('./')
  // }
];
