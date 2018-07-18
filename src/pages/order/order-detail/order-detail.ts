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
  expressCode: any;
  expressName: any;
  traces: any;
  tracesStatus = true;
  orderId:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
  ) {
    this.orderId = this.navParams.get('orderId');
    this.init();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
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
  orderTakeDelivery(id){
    this.orderService.orderTakeDelivery({'order_id':id}).subscribe(res =>{
      this.init();
    })
  }

  // 删除订单
  deleteOrder() {
    this.orderService.deleteOrder({'order_id':this.orderId}).subscribe(res =>{
      this.navCtrl.pop();
    })
  }

  //退款
  refund(){

  }

  // 去支付
  orderPay(){

  }

}
