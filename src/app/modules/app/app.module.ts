import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PROVIDERS } from '@app/providers';
import { ConfigModule } from '@app/shared/config';
import { LoggerModule } from '@app/shared/logger';
import { TileMenuModule } from '@app/shared/tile-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/app-root/app-root.component';
import { MainMenuComponent } from './pages';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppRootComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TileMenuModule,
    LoggerModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  providers: PROVIDERS,
  bootstrap: [AppRootComponent]
})
export class AppModule { }
