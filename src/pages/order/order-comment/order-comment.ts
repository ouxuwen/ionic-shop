import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
/**
 * Generated class for the OrderCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-comment',
  templateUrl: 'order-comment.html',
})
export class OrderCommentPage {
  ping = 'h';
  commont: any;
  orderDetail: any;
  goodsEvaluate: any;
  score:5;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,

  ) {
    this.orderDetail = this.navParams.get('orderDetail');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCommentPage');
  }

  submit() {
    let params = {
      order_id: this.orderDetail.order_id,
      order_no: this.orderDetail.order_no,
      goodsEvaluate: this.goodsEvaluate
    }
    this.orderService.addGoodsEvaluate(params).subscribe(res => {

    })
  }

}
