import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
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
  ping = 1;
  commont: any;
  orderDetail: any;
  goodsEvaluate: any;
  score=5;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController,
  ) {
    this.orderDetail = this.navParams.get('orderDetail');
    console.log( this.orderDetail)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCommentPage');
  }

  submit() {
    this.goodsEvaluate = [];
    let goods = this.orderDetail['order_goods']?this.orderDetail['order_goods']:this.orderDetail['order_item_list'];
    goods.forEach(el =>{
      this.goodsEvaluate.push({
        order_goods_id:el.order_goods_id,
        explain_type:this.ping,
        content:this.commont,
        scores:this.score
      })
    })


    let params = {
      order_id: this.orderDetail.order_id,
      order_no: this.orderDetail.order_no,
      goodsEvaluate:JSON.stringify(this.goodsEvaluate)
    }
    this.orderService.addGoodsEvaluate(params).subscribe(res => {
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        message: '提交评价成功！',
        buttons: [
          {
            text: '确定',
            role:'cancel',
            handler: () => {
                this.navCtrl.pop()
            }
          }
        ]
      }).present();
    })
  }

}
