import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverPage } from '../goods-detail/popover-page';
declare var window:any;
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  appInfo: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public popoverCtrl: PopoverController,
  ) {
    this.storage.get('appInfo').then(res => {
      if (res) {
        this.appInfo = res;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  message(){
    if (window.Chatra) {
      window.Chatra('show');
      window.Chatra('openChat',true)
    }
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {});
    popover.present({
      ev: ev
    });
  }

}
