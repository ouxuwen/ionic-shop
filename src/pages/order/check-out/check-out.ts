import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
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
  cartData: any = [];
  totalPrice = 0;
  tagList: any; //购物车id集合 or goodsList
  tag: string; //'cart' 从购物车 'buy_now' 立即购买
  orderDetail:any; //订单信息

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService
  ) {
    this.cartData = this.navParams.get('cartData');
    this.tag = this.navParams.get('tag');
    this.tagList = this.navParams.get('cartList')?this.navParams.get('cartList'):this.navParams.get('goodsList');
    this.orderInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }

  pay() {

  }

  orderInfo() {
    let params = {
      tag: this.tag,
      cart_list: this.tagList
    }
    this.orderService.orderInfo(params).subscribe(res => {

    })
  }
}
