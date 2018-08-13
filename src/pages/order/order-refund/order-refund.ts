import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
/**
 * Generated class for the OrderRefundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-refund',
  templateUrl: 'order-refund.html',
})
export class OrderRefundPage {
  orderGoodsId: number;
  orderId: number;
  refundDetail: any;
  refundMoney: number;
  refundReason: string;
  orderStatus;
  penning = false;
  refundShippingNo;
  refundExpressCompany;
  maxRefund:number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController
  ) {
    this.init();
  }

  init() {
    this.orderGoodsId = this.navParams.get('order_goods_id');
    this.orderId = this.navParams.get('order_id');
    this.orderStatus = this.navParams.get('order_status');
    this.getRefundDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderRefundPage');
  }

  getRefundDetail() {
    this.orderService.refundDetail({ order_goods_id: this.orderGoodsId }).subscribe(res => {
      this.refundDetail = res['data'];
      this.maxRefund = Number(res['data']['refund_money']);
    })
  }

  confirm() {
    if (this.orderStatus == 1) {
      this.orderGoodsRefundAskfor();
    } else {
      this.orderGoodsRefundExpress();
    }
  }

  // 申请退款
  orderGoodsRefundAskfor() {
    if (!this.refundReason) {
      this.alertCtrl.create({
        title: '温馨提示',
        message: '亲，请填写完整信息',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      }).present();
      return;
    }
    let params = {
      order_id: this.orderId,
      order_goods_id: this.orderGoodsId,
      refund_require_money: this.refundMoney?this.refundMoney:'',
      refund_reason: this.refundReason
    }
    this.orderService.orderGoodsRefundAskfor(params).subscribe(res => {
      this.penning = true;
      this.alertCtrl.create({
        title: '温馨提示',
        message: '退款申请成功！',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      }).present();
    })
  }

  // 退货
  orderGoodsRefundExpress() {
    if (!this.refundReason || !this.refundShippingNo || !this.refundExpressCompany) {
      this.alertCtrl.create({
        title: '温馨提示',
        message: '亲，请填写完整信息',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      }).present();
      return;
    }
    let params = {
      order_id: this.orderId,
      order_goods_id: this.orderGoodsId,
      refund_require_money: this.refundMoney?this.refundMoney:'',
      refund_reason: this.refundReason,
      refund_shipping_no: this.refundShippingNo,
      refund_express_company: this.refundExpressCompany
    }
    this.orderService.orderGoodsRefundExpress(params).subscribe(res => {
      this.penning = true;
      this.alertCtrl.create({
        title: '温馨提示',
        message: '退款申请成功！',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      }).present();
    })
  }

}
