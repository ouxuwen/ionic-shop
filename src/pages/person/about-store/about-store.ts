import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AboutStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-store',
  templateUrl: 'about-store.html',
})
export class AboutStorePage {
  appInfo:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.storage.get('appInfo').then(res=>{
      this.appInfo = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutStorePage');
  }

}
