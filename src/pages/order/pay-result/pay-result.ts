import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
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
  paySuccess: any;
  outTradeNo: any;
  orderId: any;
  payMoney: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public orderService: OrderService,
  ) {
    this.paySuccess = this.navParams.get('paySuccess');
    this.outTradeNo = this.navParams.get('no');
    this.orderId = this.navParams.get('orderId');
    this.payMoney = this.navParams.get('money');

    console.log(this.paySuccess)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayResultPage');
    if (!this.paySuccess) {
      this.getPayValueByNo()
    } else {
      this.navCtrl.remove(this.navCtrl.length() - 2, 1);
    }
  }

  orderDetail() {

    this.navCtrl.push('OrderDetailPage', { 'no': this.outTradeNo }).then(() => {
      this.navCtrl.remove(0, this.navCtrl.length()).then(() => {
        if (this.paySuccess) {
          this.navCtrl.insert(0, "OrderPage", { "status": 1 });
        } else {
          this.navCtrl.insert(0, "OrderPage", { "status": 0 });
        }
      });
    });
  }

  getPayValueByNo() {
    this.orderService.getPayValueByNo({ 'out_trade_no': this.outTradeNo }).subscribe(res => {
      this.paySuccess = true;
    })
  }

  repay() {
    this.navCtrl.pop();
  }

}
