import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/${home}',
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
