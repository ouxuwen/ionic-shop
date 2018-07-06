import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/person/login/login';
import { Storage } from '@ionic/storage';
import { BusinessLicensePage } from '../pages/person/business-license/business-license';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.storage.get("notFirstEnter").then(res => {
      if (res) {
        this.rootPage = TabsPage;
      } else {
        this.storage.get("userInfo").then(res => {
          if(res){
            if(res.token){
              this.rootPage = TabsPage;
            }else{
              this.rootPage = BusinessLicensePage;
            }
          }else{
            this.rootPage = WelcomePage;
          }
        })
        this.storage.set("notFirstEnter",true);
      }
    })


  }

}
