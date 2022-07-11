import { ITileConfig } from '@app/shared/tile-menu';
import { Language } from '@app/shared/translation';
import { PersonalData } from './personal-data.interface';

export interface IConfig {
    mainMenu: {
        tileConfig: ITileConfig[];
    },
    defaultLanguage: Language,
    personalData: PersonalData,
};