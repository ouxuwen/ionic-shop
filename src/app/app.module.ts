import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule,Nav } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { LoginPageModule } from '../pages/person/login/login.module';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BusinessLicensePageModule } from '../pages/person/business-license/business-license.module';
import { PopoverPage } from '../pages/goods-detail/popover-page';
import { BaseHttpProvider } from '../providers/base-http';
import { ApiService } from '../providers/api';
import { PersonService } from '../providers/person';

import { ComponentsModule } from '../components/components.module';
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
    LoginPageModule,
    BusinessLicensePageModule,
    IonicStorageModule.forRoot(),
    ComponentsModule
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
    ApiService,
    PersonService,
    Nav
  ]
})
export class AppModule { }
