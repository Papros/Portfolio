import { Injectable } from '@angular/core';
import { IPiprTourNavigation } from './navigation.token';

@Injectable()
export class RouterTourNavigationService implements IPiprTourNavigation {
  navigate(route: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
