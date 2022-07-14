import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './enums';
import { 
  MainMenuPageComponent,
  AboutMePageComponent
 } from './pages';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: `/${ AppRoutes.MainMenu }`,
}, {
  path: AppRoutes.MainMenu,
  component: MainMenuPageComponent
  //loadChildren: async () => (await import('@app/pages/main-menu')).MainMenuComponent,
}, {
  path: AppRoutes.AboutMe,
  component: AboutMePageComponent
}, {
  path: AppRoutes.Projects,
  component: AboutMePageComponent
}, {
  path: AppRoutes.OtherProjects,
  component: AboutMePageComponent
}, { 
  path: '**',
  redirectTo: `/${ AppRoutes.MainMenu }`,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    relativeLinkResolution: 'corrected',
    preloadingStrategy: NoPreloading,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
