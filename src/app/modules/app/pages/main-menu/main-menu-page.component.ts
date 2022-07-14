import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CONFIG_SERVICE, IConfig, IConfigservice } from '@app/shared/config';
import { ILoggerService, LOGGER_SERVICE } from '@app/shared/logger';
import { ITileConfig } from '@app/shared/tile-menu';
import { Subscription, pluck, filter } from 'rxjs';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss'] 
})
export class MainMenuPageComponent implements OnInit, OnDestroy {
  private readonly loggerPrefix = 'MainMenuComponent';
  public tileConfig: ITileConfig[];
  private configChanges$: Subscription;

  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigservice,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ){
    this.tileConfig = [];
    this.configChanges$ = this.configService.Config$
    .subscribe((config: IConfig) => {
      this.tileConfig = config.mainMenu.tileConfig;
      this.logger.debug(`Found ${ this.tileConfig.length } tiles`, this.loggerPrefix);
    });
  }

  public ngOnDestroy(): void {
    this.logger.debug(`Destroing`,this.loggerPrefix);
    this.configChanges$?.unsubscribe();
  }

  public ngOnInit(): void {
    this.logger.debug(`Initalized`,this.loggerPrefix);
    this.configService.fetch();
  }
}