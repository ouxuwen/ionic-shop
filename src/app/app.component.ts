import { Component, ViewChild } from '@angular/core';
import { IonicApp, Platform, Nav, Keyboard, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/person/login/login';
import { Storage } from '@ionic/storage';
import { BusinessLicensePage } from '../pages/person/business-license/business-license';
import { JPush } from "@jiguang-ionic/jpush";
import { Device } from "@ionic-native/device";
//import { GoodsService } from '../providers/goods';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: Nav;
  rootPage: any;
  backButtonPressed: boolean;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    private toastCtrl: ToastController,
    public keyboard: Keyboard,
    private ionicApp: IonicApp,
    public device: Device,
    public jpush: JPush,
    //public goodsService:GoodsService
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.registerBackButtonAction();
      this.jpush.init();
      this.jpush.setDebugMode(true);
      this.init();
    });
    this.storage.get("notFirstEnter").then(res => {
      if (res) {
        this.storage.get("userInfo").then(res => {
          if (res) {
            if (res.token) {
              this.rootPage = TabsPage;
            } else {
              this.rootPage = BusinessLicensePage;
            }
          } else {
            this.rootPage = LoginPage;
          }
        })
      } else {
        this.rootPage = WelcomePage;
      }
    })
  }


  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._loadingPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let navRoot = this.nav.getActive().id;
      if (navRoot !== 'WelcomePage') {
        let activeVC = this.nav.getActive();
        let tabs = activeVC.instance.tabs;
        let activeNav = tabs.getSelected();
        return activeNav.canGoBack() ? activeNav.pop() : this.showExit();
      } else {
        this.showExit();
      }
    }, 101);
  }

  showExit() {

    if (this.backButtonPressed) this.platform.exitApp();
    else {
      let toast = this.toastCtrl.create({
        message: '再次点击返回退出',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

  init() {
    if (this.platform.versions().ios) {
      if (this.platform.versions().ios.num < 11) {
        this.statusBar.overlaysWebView(true);
      } else {
        this.statusBar.overlaysWebView(false);
      }
    }

    // this.goodsService.getAppInfo().subscribe(res=>{
    //   this.storage.set('appInfo', res['data']);
    // })
  }


}
