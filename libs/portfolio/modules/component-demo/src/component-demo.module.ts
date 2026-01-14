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
import { ComponentDetailsComponent } from './lib/components/component-details/component-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsGalleryComponent } from './lib/components/components-gallery/components-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentDemoPageComponent,
    children: [
      { path: '', component: ComponentsGalleryComponent },
      { path: ':component', component: ComponentDetailsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    DemoCardComponent,
    ComponentDemoPageComponent,
    ComponentDetailsComponent,
    ComponentsGalleryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavigationBarComponent,
    SimpleMenuComponent,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
  ],
})
export class ComponentDemoModule {}
