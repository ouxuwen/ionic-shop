import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
/**
 * Generated class for the RefundDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refund-detail',
  templateUrl: 'refund-detail.html',
})
export class RefundDetailPage {
  orderGoodsId: number;
  orderId: number;
  refundDetail: any;
  refundMoney: number;
  refundReason: string;
  orderStatus;
  penning = false;
  refundShippingNo;
  refundExpressCompany;
  maxRefund: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController

  ) {
    this.orderGoodsId = this.navParams.get('order_goods_id');
    this.orderId = this.navParams.get('order_id');
    this.orderStatus = this.navParams.get('order_status');
    this.getRefundDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefundDetailPage');
  }

  getRefundDetail() {
    this.orderService.refundDetail({ order_goods_id: this.orderGoodsId }).subscribe(res => {
      this.refundDetail = res['data'];
    })
  }

  cancelRefund() {
    this.orderService.cancleRefund({ order_goods_id: this.orderGoodsId, order_id: this.orderId }).subscribe(res => {
      this.alertCtrl.create({
        title: '温馨提示',
        message: '取消成功！',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
    })
  }

}
