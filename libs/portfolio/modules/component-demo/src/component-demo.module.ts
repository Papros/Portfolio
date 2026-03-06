import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentDemoPageComponent } from './lib/components/component-demo-page/component-demo-page.component';
import { DemoCardComponent } from './lib/components/demo-card/demo-card.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  NavigationBarComponent,
  SimpleMenuComponent,
} from '@portfolio/shared-pack';
import { ComponentDetailsComponent } from './lib/components/component-details/component-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsGalleryComponent } from './lib/components/components-gallery/components-gallery.component';
import {
  ArticleSectionComponent,
  CodeBlockComponent,
  ComponentApiComponent,
  ComponentExampleComponent,
  ComponentOverviewComponent,
  CodeHighlightDirective,
} from './lib/components';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { componentDocResolver } from './lib/resolvers/component-doc.resolver';
import {
  provideGithubDocsSource,
  DocsSourceFacade,
} from '@portfolio/component-docs-data-access';
import { ClipboardModule } from '@angular/cdk/clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';

const routes: Routes = [
  {
    path: '',
    component: ComponentDemoPageComponent,
    children: [
      { path: '', component: ComponentsGalleryComponent },
      {
        path: ':component',
        component: ComponentDetailsComponent,
        resolve: {
          doc: componentDocResolver,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    DemoCardComponent,
    ComponentsGalleryComponent,
    ComponentDemoPageComponent,
    ComponentDetailsComponent,
    ComponentOverviewComponent,
    ComponentExampleComponent,
    ComponentApiComponent,
    CodeBlockComponent,
    ArticleSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavigationBarComponent,
    SimpleMenuComponent,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatIcon,
    MatTableModule,
    MatTooltipModule,
    ClipboardModule,
    CodeHighlightDirective,
  ],
  providers: [DocsSourceFacade, provideGithubDocsSource()],
})
export class ComponentDemoModule {}
