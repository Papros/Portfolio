import { inject, Injectable } from '@angular/core';
import { IPiprTourNavigation } from './navigation.token';
import { Router } from '@angular/router';

@Injectable()
export class RouterTourNavigationService implements IPiprTourNavigation {
  private readonly router = inject(Router);

  navigate(route: string): Promise<boolean> {
    return this.router.navigateByUrl(route);
  }

  getCurrentRoute(): string {
    return this.router.url.split('?')[0];
  }
}
