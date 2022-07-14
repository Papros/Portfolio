import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PROVIDERS } from '@app/providers';
import { ConfigModule } from '@app/shared/config';
import { LoggerModule } from '@app/shared/logger';
import { TileMenuModule } from '@app/shared/tile-menu';
import { LoaderModule } from '@app/shared/loader';
import { LoaderScreenModule } from '@app/shared/loader-screen';
import { TranslationModule } from '@app/shared/translation';
import { StorageModule } from '@app/shared/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/app-root/app-root.component';
import { 
  MainMenuPageComponent,
  AboutMePageComponent,
} from './pages';
import { SettingsPanelModule } from '@app/features/settingpanel';
import { ContactsInfoModule } from '@app/features/contact';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppRootComponent,
    MainMenuPageComponent,
    AboutMePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TileMenuModule,
    LoaderScreenModule,
    SettingsPanelModule,
    ContactsInfoModule,
    LoggerModule.forRoot(),
    ConfigModule.forRoot(),
    LoaderModule.forRoot(),
    StorageModule.forRoot(),
    TranslationModule
  ],
  providers: PROVIDERS,
  bootstrap: [AppRootComponent]
})
export class AppModule { }
