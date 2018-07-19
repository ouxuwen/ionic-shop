import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderService } from '../../providers/order';
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
      if (refresher) {
        this.orderList.concat(data);
        refresher.complete();
      } else {
        this.orderList = data;
      }
      this.orderList.map(el => {
        let count = 0;
        el.order_item_list.forEach(go => {
          count += Number(go.num);
        })
        el['goods_count'] = count;
      })
      if (data.length < 15) {
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
    let alert = this.alertCtrl.create({
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
    });
    alert.present();
  }

  deleteOrder(id) {
    this.orderService.deleteOrder({'order_id':id}).subscribe(res =>{
      this.getOrder();
    })
  }

  //退款
  refund(){

  }

  // 去支付
  orderPay(){

  }

  // 上拉
  doInfinite(refresher) {
    if (!this.canLoadMore) return;
    this.pageNo++;
    this.getOrder(refresher);
  }

}
