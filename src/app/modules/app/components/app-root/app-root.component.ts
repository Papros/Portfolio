import { Component, Inject, OnInit } from '@angular/core';
import { ILoaderService, LoaderToken, LOADER_SERVICE } from '@app/shared/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'] 
})
export class AppRootComponent implements OnInit {

  constructor(
    @Inject(LOADER_SERVICE) private readonly loaderService: ILoaderService,
  ) {

  }

  public isRootLoaderActive() {
    console.log('Loader: '+this.loaderService.getLoaderState(LoaderToken.RootLoader));
    return this.loaderService.getLoaderState(LoaderToken.RootLoader);
  }

  ngOnInit(): void {
    this.loaderService.register(LoaderToken.RootLoader);
  }
}
