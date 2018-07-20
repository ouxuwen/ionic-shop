import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  payMoney:number = 0;
  no:number;
  payMethod = 'ALIPAY';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,


  ) {

    this.no = this.navParams.get('no');
    this.payMoney = this.navParams.get('money');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }

  pay(){
    if(  this.payMethod == 'ALIPAY'){
      this.orderService.mobileAlipay({'no':this.no}).subscribe(res =>{
        console.log(res);
      })
    }
  }
}
