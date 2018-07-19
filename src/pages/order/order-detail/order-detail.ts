import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  expressCode: any;
  expressName: any;
  traces: any;
  tracesStatus = true;
  orderId: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController
  ) {
    this.orderId = this.navParams.get('orderId');

  }

  init() {
    this.orderService.orderDetail({ orderId: this.orderId }).subscribe(res => {
      let data = res['data']
      this.orderDetail = data.order;
      this.expressCode = data.express_code;
      this.expressName = data.express_name;

      if (this.expressCode) {
        this.getExpressDetail(data.order.goods_packet_list[0].express_id);
      }
      if (this.orderDetail) {
        this.orderDetail.order_goods.forEach(el => {
          this.goodsCount += Number(el.num);
        })
      }
    })
  }

  ionViewDidEnter() {
    this.init();
  }

  openDetail($event, id) {
    event.stopPropagation();
    this.navCtrl.push('GoodsDetailPage', {
      goods_id: id
    })
  }

  getExpressDetail(id) {
    this.orderService.getOrderGoodsExpressMessage({ 'express_id': id }).subscribe(res => {
      let data = res['data'];
      this.tracesStatus = data.Success;
      this.traces = data['Traces'];
      console.log(this.traces)
    })
  }

  // 收货
  orderTakeDelivery() {
    this.orderService.orderTakeDelivery({ 'order_id': this.orderDetail.order_id }).subscribe(res => {
      this.init();
    })
  }

  // 删除订单
  deleteOrder() {
    let alert = this.alertCtrl.create({
      title: '温馨提示',
      message: '亲，您确定删除吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            this.orderService.deleteOrder({ 'order_id': this.orderId }).subscribe(res => {
              this.navCtrl.pop();
            })
          }
        }
      ]
    }).present();

  }

  //退款
  refund(e, goods_id) {
    e.stopPropagation();
    this.navCtrl.push('OrderRefundPage', { 'order_goods_id': goods_id, 'order_id': this.orderDetail.order_id, 'order_status': this.orderDetail.order_status })
  }

  // 去支付
  orderPay() {
    this.orderService.orderPay({id:this.orderDetail.order_id}).subscribe(res=>{
      this.navCtrl.push("PayPage",{'no':res['data']});
    })
  }

  back() {
    this.navCtrl.pop();
  }

  // 评论
  evaluate() {
    this.navCtrl.push('OrderCommentPage', { 'orderDetail': this.orderDetail });
  }

}
