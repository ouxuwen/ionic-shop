import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler,IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PopoverPage } from '../pages/goods-detail/goods-detail';
import { BaseHttpProvider } from '../providers/base-http';
import { ApiService } from '../providers/api';
@NgModule({
  declarations: [
    MyApp,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      // mode: 'ios',
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      iconMode: 'ios',
    }),
    HttpClientModule,
    WelcomePageModule,
    TabsPageModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BaseHttpProvider,
    ApiService

  ]
})
export class AppModule { }
