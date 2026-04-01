import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IconService } from '@portfolio/shared-pack';
import { persistenceProviders } from '@portfolio/persistence';
import { ThemeService } from '@portfolio/customization';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideAppInitializer(() => {
      inject(IconService).registerIcons();
      inject(ThemeService);
    }),
    ...persistenceProviders,
  ],
};
