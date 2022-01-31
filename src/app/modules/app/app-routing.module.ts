import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './enums';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: `/${ AppRoutes.MainMenu }`,
}, {
  path: AppRoutes.MainMenu,
  loadChildren: async () => (await import('@app/pages/main-menu')).MainMenuComponent,
}, {
  path: '**',
  redirectTo: '/',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    relativeLinkResolution: 'corrected',
    preloadingStrategy: NoPreloading,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
