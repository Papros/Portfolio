import { InjectionToken } from '@angular/core';

export const PIPR_TOUR_NAVIGATION = new InjectionToken<IPiprTourNavigation>(
  'PiprTourNavigation',
);

export interface IPiprTourNavigation {
  navigate(route: string): Promise<boolean>;
}
