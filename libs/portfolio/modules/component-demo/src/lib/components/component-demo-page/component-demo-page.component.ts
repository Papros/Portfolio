import { Component } from '@angular/core';
import { NavigationAction, SimpleMenuAction } from '@portfolio/shared-pack';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-component-demo-page',
  templateUrl: './component-demo-page.component.html',
  styleUrl: './component-demo-page.component.scss',
  standalone: false,
})
export class ComponentDemoPageComponent {
  componentMenuList: SimpleMenuAction[] = [
    {
      label: 'Button',
      navigation: 'button',
    },
    {
      label: 'Test2',
      navigation: 'test2',
    },
  ];

  navigationActions: NavigationAction[] = [
    {
      icon: 'home',
      callback: () => {
        this.router.navigate(['/menu']);
      },
    },
    {
      label: 'Components',
      callback: () => {
        this.router.navigate(['components']);
      },
    },
  ];

  componentDetails = null;

  constructor(private router: Router) {}
}
