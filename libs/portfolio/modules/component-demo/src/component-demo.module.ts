import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentDemoPageComponent } from './lib/components/component-demo-page/component-demo-page.component';
import { DemoCardComponent } from './lib/components/demo-card/demo-card.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  NavigationBarComponent,
  SimpleMenuComponent,
} from '@portfolio/shared-pack';

const routes: Routes = [
  {
    path: '',
    component: ComponentDemoPageComponent,
    children: [{ path: ':component', component: ComponentDemoPageComponent }],
  },
];

@NgModule({
  declarations: [DemoCardComponent, ComponentDemoPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavigationBarComponent,
    SimpleMenuComponent,
    MatSidenavModule,
    MatButtonModule,
  ],
})
export class ComponentDemoModule {}
