import { InjectionToken, Provider } from '@angular/core';
import { IStorageService } from '../interfaces';
import { BrowserStorageService } from '../services/browser-storage.service';

export const STORAGE_SERVICE = new InjectionToken<IStorageService>(
  'STORAGE_SERVICE',
);

export const persistenceProviders: Provider[] = [
  {
    provide: STORAGE_SERVICE,
    useClass: BrowserStorageService,
  },
];
