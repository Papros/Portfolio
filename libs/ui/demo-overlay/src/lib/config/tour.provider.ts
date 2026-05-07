import { EnvironmentProviders } from '@angular/core';
import {
  TooltipPlacement,
  PulseVariant,
  SpotlightVariant,
} from '../model/tour.enum';
import { TourConfig, HintConfig } from '../model/tour.interface';
import { IPiprTourNavigation } from '../navigation/navigation.token';
import { IPiprTourStorage } from '../storage/tour-storage.token';

export function providePiprTour(
  config: PiprTourGlobalConfig,
): EnvironmentProviders {
  throw new Error('Method not implemented.');
}

export interface PiprTourGlobalConfig {
  userId: string; // np. 'browser' jeśli bez auth
  tours?: TourConfig[]; // opcja alternatywna dla dyrektyw
  hints?: HintConfig[];
  storage?: IPiprTourStorage; // custom, domyślnie BrowserTourStorage
  navigation?: IPiprTourNavigation; // custom, domyślnie RouterTourNavigation
  defaults?: {
    placement: TooltipPlacement;
    pulse: PulseVariant;
    spotlight: SpotlightVariant;
    showProgress: boolean;
    allowKeyboard: boolean;
    skipLabel: string;
    nextLabel: string;
    prevLabel: string;
    finishLabel: string;
  };
}
