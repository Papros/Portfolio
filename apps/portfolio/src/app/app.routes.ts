import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@portfolio/default-layout';
import { FullPageLayoutComponent } from '@portfolio/full-page-layout';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'menu',
        loadComponent: () =>
          import('@portfolio/main-menu-module').then(
            (m) => m.MainMenuPageComponent
          ),
      },
      {
        path: 'error',
        loadComponent: () =>
          import('@portfolio/landing-pages-pack').then(
            (m) => m.ErrorLandingPageComponent
          ),
      },
      {
        path: 'construction',
        loadComponent: () =>
          import('@portfolio/landing-pages-pack').then(
            (m) => m.NotReadyLandingPageComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: FullPageLayoutComponent,
    children: [
      {
        path: 'about',
        loadComponent: () =>
          import('@portfolio/about-me-module').then(
            (m) => m.AboutMePageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'about',
    pathMatch: 'full',
  },
];
