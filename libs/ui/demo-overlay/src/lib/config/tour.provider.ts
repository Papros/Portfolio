import {
  APP_INITIALIZER,
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentProviders,
  inject,
  InjectionToken,
  Injector,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  TooltipPlacement,
  PulseVariant,
  SpotlightVariant,
} from '../model/tour.enum';
import {
  TourConfig,
  HintConfig,
  TourDefaults,
  PiprTourGlobalConfig,
} from '../model/tour.interface';
import {
  IPiprTourNavigation,
  PIPR_TOUR_NAVIGATION,
} from '../navigation/navigation.token';
import {
  IPiprTourStorage,
  PIPR_TOUR_STORAGE,
} from '../storage/tour-storage.token';
import { BrowserTourStorageService } from '../storage/browser-tour-storage.service';
import { RouterTourNavigationService } from '../navigation/router-tour-navigation';
import { TourOverlayComponent } from '../components/tour-overlay/tour-overlay.component';

export interface PiprTourResolvedConfig extends Required<
  Omit<PiprTourGlobalConfig, 'defaults'>
> {
  defaults: TourDefaults;
}

export const PIPR_TOUR_CONFIG = new InjectionToken<PiprTourResolvedConfig>(
  'PiprTourConfig',
);

const DEFAULT_TOUR_DEFAULTS: TourDefaults = {
  placement: TooltipPlacement.BOTTOM,
  pulse: PulseVariant.PRIMARY,
  spotlight: SpotlightVariant.FULL,
  showProgress: true,
  allowKeyboard: true,
  skipLabel: 'Skip tour',
  nextLabel: 'Next',
  prevLabel: 'Back',
  finishLabel: 'Finish',
};

export function providePiprTour(
  config: PiprTourGlobalConfig,
): EnvironmentProviders {
  const resolved: PiprTourResolvedConfig = {
    userId: config.userId,
    tours: config.tours ?? [],
    hints: config.hints ?? [],
    storage: config.storage ?? (undefined as any), // resolved via token below
    navigation: config.navigation ?? (undefined as any),
    defaults: { ...DEFAULT_TOUR_DEFAULTS, ...(config.defaults ?? {}) },
    onUnexpectedNavigation: config.onUnexpectedNavigation ?? 'ignore'
  };

  return makeEnvironmentProviders([
    {
      provide: PIPR_TOUR_CONFIG,
      useValue: resolved,
    },
    config.storage
      ? { provide: PIPR_TOUR_STORAGE, useValue: config.storage }
      : { provide: PIPR_TOUR_STORAGE, useClass: BrowserTourStorageService },
    config.navigation
      ? { provide: PIPR_TOUR_NAVIGATION, useValue: config.navigation }
      : {
          provide: PIPR_TOUR_NAVIGATION,
          useClass: RouterTourNavigationService,
        },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const appRef = inject(ApplicationRef);
        const injector = inject(Injector);

        return () => {
          const overlayRef: ComponentRef<TourOverlayComponent> =
            createComponent(TourOverlayComponent, {
              environmentInjector: appRef.injector,
              elementInjector: injector,
            });

          appRef.attachView(overlayRef.hostView);
          document.body.appendChild(overlayRef.location.nativeElement);
        };
      },
      multi: true,
    },
  ]);
}
