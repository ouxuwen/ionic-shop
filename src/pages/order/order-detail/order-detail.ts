import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  orderDetail: any;
  goodsCount = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
  ) {
    this.init();
  }

  init() {
    this.orderDetail = this.navParams.get('orderDetail');
    this.orderDetail.order_item_list.forEach(el => {
      this.goodsCount += Number(el.num);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  openDetail($event,id){
    event.stopPropagation();
    this.navCtrl.push('GoodsDetailPage', {
      goods_id: id
    })
  }
}
