import { Inject, Injectable } from "@angular/core";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { IConfig, IConfigservice } from "../interfaces";
import appConfig from '@app/config/menu';
import { ITileConfig } from "../../tile-menu/interfaces";

@Injectable()
export class ConfigService implements IConfigservice {
    private readonly loggerPrefix = 'ConfigService';
    private config: IConfig;

    public constructor(
        @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
    ){
        this.config = JSON.parse(JSON.stringify(appConfig));
    }
    
    fetch(): IConfig {
        this.logger.debug(`Fetching config data`, this.loggerPrefix)
        this.config = appConfig as unknown as IConfig;
        return this.config;
    }

    getConfig(): IConfig {
        return this.config || this.fetch();
    }
    
}