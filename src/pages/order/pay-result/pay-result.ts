import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,App } from 'ionic-angular';

/**
 * Generated class for the PayResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-result',
  templateUrl: 'pay-result.html',
})
export class PayResultPage {
  paySuccess: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App
  ) {
    this.paySuccess = this.navParams.get('paySuccess');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayResultPage');
  }

  orderDetail(){
    this.appCtrl.getRootNav().push('OrderPage');
  }

}
