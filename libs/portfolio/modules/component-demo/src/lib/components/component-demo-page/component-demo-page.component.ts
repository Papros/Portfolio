import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NavigationAction,
  SimpleMenuAction,
} from '@portfolio/shared-pack/components';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-component-demo-page',
  templateUrl: './component-demo-page.component.html',
  styleUrl: './component-demo-page.component.scss',
  standalone: false,
})
export class ComponentDemoPageComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;

  isMobile = false;
  readonly currentYear = new Date().getFullYear();

  private bpSub!: Subscription;

  componentMenuList: SimpleMenuAction[] = [
    {
      label: 'Overlay menu',
      navigation: 'overlay-menu',
    },
    {
      label: 'Multistate slider',
      navigation: 'multistate-slider',
    },
  ];

  navigationActions: NavigationAction[] = [
    { id: 'home', icon: 'home' },
    { id: 'components', label: 'Components', routerLink: '/components' },
    { id: 'menu', icon: 'menu', cssClass: 'mobile-only' },
  ];

  constructor(
    private router: Router,
    private bp: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.bpSub = this.bp.observe('(max-width: 767px)').subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  onNavigationAction(id: string) {
    switch (id) {
      case 'home':
        this.router.navigate(['/menu']);
        break;
      case 'components':
        this.router.navigate(['components']);
        break;
      case 'menu':
        this.drawer.toggle();
        break;
    }
  }

  ngOnDestroy() {
    this.bpSub.unsubscribe();
  }
}
