import { Inject, Injectable } from "@angular/core";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { IConfig, IConfigservice } from "../interfaces";
import { AppConfig } from '@app/config/menu';
import { BehaviorSubject, Observable } from "rxjs";
import { Language } from "@app/shared/translation";

@Injectable()
export class ConfigService implements IConfigservice {

    public Config$: BehaviorSubject<IConfig>;

    private readonly loggerPrefix = 'ConfigService';
    
    public constructor(
        @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
    ){
        this.Config$ = new BehaviorSubject<IConfig>(
            {mainMenu:{ tileConfig: [] }, defaultLanguage:Language.EN, personalData: {}}
            );
    }
    
    fetch(): IConfig {
        this.logger.debug(`Fetching config data`, this.loggerPrefix);
        this.Config$.next(AppConfig as IConfig);
        return this.Config$.getValue();
    }

    getConfig(): IConfig {
        return this.Config$.getValue();
    }
    
}