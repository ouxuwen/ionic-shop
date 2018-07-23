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
  orderId:any;
  payMoney:any;
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
    if(!this.paySuccess){
      this.getPayValueByNo()
    }
  }

  orderDetail() {
    this.appCtrl.getRootNav().push('OrderDetailPage', { 'no': this.outTradeNo });
  }

  getPayValueByNo(){
    this.orderService.getPayValueByNo({'out_trade_no':this.outTradeNo}).subscribe(res =>{
      this.paySuccess = true;
    })
  }

  repay(){
    this.orderService.orderPay({
      'id': this.orderId,
      'out_trade_no': this.outTradeNo
    }).subscribe(res => {
      this.navCtrl.push('PayPage',{
        'order_id':this.orderId,
        'money':this.payMoney,
        'out_trade_no':res['data'],
        'payMethod':'REALIPAY',
      })
    })
  }

}
