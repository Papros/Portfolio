import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CONFIG_SERVICE, IConfigservice } from '@app/shared/config';
import { ILoggerService, LOGGER_SERVICE } from '@app/shared/logger';
import { ITileConfig } from '@app/shared/tile-menu';

@Component({
  selector: 'main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss'] 
})
export class MainMenuComponent implements OnInit, OnDestroy {
  private readonly loggerPrefix = 'MainMenuComponent';
  public readonly tileConfig: ITileConfig[];

  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigservice,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ){
    this.tileConfig = this.configService.fetch().mainMenu.tileConfig;
    this.logger.debug(`Found ${ this.tileConfig.length } tiles`, this.loggerPrefix);
  }

  public ngOnDestroy(): void {
    this.logger.debug(`Destroing`,this.loggerPrefix);
  }

  public ngOnInit(): void {
    this.logger.debug(`Initalized`,this.loggerPrefix);
  }
}