import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CheckOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-out',
  templateUrl: 'check-out.html',
})
export class CheckOutPage {
  hasAddress = false;
  use_coupon; // 优惠券
  integral; // 积分
  goods_sku_list // 商品列表
  leavemessage // 留言
  pay_type // 支付方式
  shipping_company_id // 物流公司
  cartData:any = [];
  totalPrice=0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.cartData = this.navParams.get('cartData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }

  pay(){
    
  }
}
