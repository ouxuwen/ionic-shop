import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderService } from '../../providers/order';
declare var window:any;
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  orderStatus = 'all';
  pageNo: number = 1;
  orderList: any;
  canLoadMore: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController

  ) {
    this.orderStatus = this.navParams.get('status') ? this.navParams.get('status') : 'all';
    this.getOrder();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  statusChange() {
    this.pageNo = 1;
    this.canLoadMore = true;
    this.getOrder();
  }

  getOrder(refresher?) {
    if (!this.canLoadMore) {
      return;
    }
    let params = {
      'status': this.orderStatus,
      'page': this.pageNo
    }
    this.orderService.myOrderList(params).subscribe(res => {
      let data = res['data']['data'];
      let totalCount = res['data'].total_count;
      data.map(el => {
        let count = 0;
        el.order_item_list.forEach(go => {
          count += Number(go.num);
        })
        el['goods_count'] = count;
      })
      if (refresher) {
        this.orderList = this.orderList.concat(data);
        refresher.complete();
      } else {
        this.orderList = data;
      }

      console.log(this.orderList.length)
      if (data.length <14) {
        this.canLoadMore = false;
      }
    })
  }

  //商品详情
  openDetail(event, e) {
    event.stopPropagation();
    this.navCtrl.push('OrderDetailPage', {
      orderId: e.order_id
    })
  }

  deleteOrderConfirm(id) {
    this.alertCtrl.create({
      title: '温馨提示',
      message: '亲，你确定要删除吗?',
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
            this.deleteOrder(id);
          }
        }
      ]
    }).present();
  }

  deleteOrder(id) {
    this.orderService.deleteOrder({'order_id':id}).subscribe(res =>{
      this.getOrder();
    })
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
            this.closeOrder(id);
          }
        }
      ]
    }).present();
  }

  closeOrder(id) {
    this.orderService.orderClose({'order_id':id}).subscribe(res =>{
      this.getOrder();
    })
  }

  // //退款
  // refund(id){
  //   this.orderService.deleteOrder({'order_id':id}).subscribe(res =>{
  //     this.getOrder();
  //   })
  // }

  // 去支付
  orderPay(e){
    this.orderService.orderPay({
      'id': e.order_id,
      'out_trade_no': e.out_trade_no
    }).subscribe(res => {
      this.navCtrl.push('PayPage',{
        'order_id':e.order_id,
        'money':e.pay_money,
        'out_trade_no':res['data'],
        'payMethod':'REALIPAY',
        'no':e.order_no
      })
    })


  }

  // 上拉
  doInfinite(refresher) {
    if (!this.canLoadMore) {refresher.complete();return;};
    this.pageNo++;
    this.getOrder(refresher);
  }

   // 评论
   evaluate(e) {
    this.navCtrl.push('OrderCommentPage', { 'orderDetail':e });
  }

  message(){
    if (window.Chatra) {
      window.Chatra('show');
      window.Chatra('openChat',true)
    }
  }
}
