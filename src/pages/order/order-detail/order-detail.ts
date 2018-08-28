import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { URL } from '../../../app.config';
declare var window:any;
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
  appInfo: any;
  outTradeNo: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController,
    public storage: Storage,
    public appCtrl: App,
    private photoViewer: PhotoViewer
  ) {
    this.orderId = this.navParams.get('orderId');
    this.outTradeNo = this.navParams.get('no');
    this.storage.get('appInfo').then(res => {
      this.appInfo = res;
    });
  }

  init() {
    this.goodsCount = 0;
    if (this.orderId) {
      this.orderService.orderDetail({ orderId: this.orderId }).subscribe(res => {
        let data = res['data']
        this.orderDetail = data.order;
        this.expressCode = data.express_code;
        this.expressName = data.express_name;

        if (this.expressCode) {
          this.getExpressDetail(data.order.goods_packet_list[0].express_id);
        }
        if (this.orderDetail) {
          data.order.order_goods.forEach(el => {
            this.goodsCount += Number(el.num);
          })
        }
      })
    } else {
      this.orderService.orderDetailByNo({ no: this.outTradeNo }).subscribe(res => {
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

  }

  ionViewDidEnter() {
    this.init();
  }

  openDetail($event, id) {
    event.stopPropagation();
    if(this.orderDetail.order_type == 3){
      let options:any = {
        share: true, // default is false
        closeButton: false, // iOS only: default is true
        copyToReference: true // iOS only: default is false
        }
      this.photoViewer.show(URL['imgPrefix']+this.orderDetail.order_goods[0].memo, '订单图片',options);
    }else{
      this.navCtrl.push('GoodsDetailPage', {
        goods_id: id
      })
    }

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
    this.alertCtrl.create({
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
  orderPay(e) {
    this.orderService.orderPay({
      'id': e.order_id,
      'out_trade_no': e.out_trade_no
    }).subscribe(res => {
      this.navCtrl.push('PayPage', {
        'order_id': e.order_id,
        'money': e.pay_money,
        'out_trade_no': res['data'],
        'payMethod': 'REALIPAY',
        'no': e.order_no
      })
    })

  }

  back() {
    if (this.orderId) {
      this.navCtrl.pop();
    }else {
      this.navCtrl.popToRoot();
    }
  }

  // 评论
  evaluate() {
    this.navCtrl.push('OrderCommentPage', { 'orderDetail': this.orderDetail });
  }

  refundDetail(e, goods_id) {
    e.stopPropagation();
    this.navCtrl.push('RefundDetailPage', {'order_goods_id': goods_id, 'order_id': this.orderDetail.order_id, 'order_status': this.orderDetail.order_status });
  }



  closeOrderConfirm(id) {
    this.alertCtrl.create({
      title: '温馨提示',
      message: '亲，你确定要关闭吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.closeOrder();
          }
        }
      ]
    }).present();
  }

  closeOrder() {
    this.orderService.orderClose({'order_id':this.orderId}).subscribe(res =>{
      this.navCtrl.pop();
    })
  }

  message(){
    if (window.Chatra) {
      window.Chatra('show');
      window.Chatra('openChat',true)
    }
  }
}
