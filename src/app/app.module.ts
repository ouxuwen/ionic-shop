import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule,Nav } from 'ionic-angular';
import { HttpModule } from '@angular/http';
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
import { GoodsService } from '../providers/goods';
import { PersonService } from '../providers/person';
import { OrderService } from '../providers/order';
import { CartService } from '../providers/cartService';
import { ComponentsModule } from '../components/components.module';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { QQSDK } from '@ionic-native/qqsdk';
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from "@ionic-native/device";

@NgModule({
  declarations: [
    MyApp,
    PopoverPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      iconMode: 'ios',
    }),
    HttpModule,
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
    PopoverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BaseHttpProvider,
    GoodsService,
    PersonService,
    OrderService,
    Nav,
    CartService,
    PhotoViewer,
    QQSDK,
    JPush,
    Device
  ]
})
export class AppModule { }
