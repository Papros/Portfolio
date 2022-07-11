import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CONFIG_SERVICE, IConfigservice } from '@app/shared/config';
import { ILoggerService, LOGGER_SERVICE } from '@app/shared/logger';
import { ITileConfig } from '@app/shared/tile-menu';

@Component({
  selector: 'app-about-me-page',
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.scss'] 
})
export class AboutMePageComponent implements OnInit, OnDestroy {
  private readonly loggerPrefix = 'AboutMePageComponent';

  constructor(
    @Inject(CONFIG_SERVICE) private readonly configService: IConfigservice,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ){
      
  }

  public ngOnDestroy(): void {
    this.logger.debug(`Destroing`,this.loggerPrefix);
  }

  public ngOnInit(): void {
    this.logger.debug(`Initalized`,this.loggerPrefix);
  }
}