import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MyHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-history',
  templateUrl: 'my-history.html',
})
export class MyHistoryPage {
  goodsList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.storage.get("historyGoods").then(res => {
      this.goodsList ='';
      if (res) {
        console.log(res)
        this.goodsList = res;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyHistoryPage');
  }

  //清除
  delete() {
    this.goodsList ='';
    this.storage.remove("historyGoods").then(res => {
      this.alertCtrl.create({
        title: '温馨提示',
        message: '清除成功！',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      }).present();
    })
  }
  //商品详情
  goGoodsDetail(id) {
    this.navCtrl.push('GoodsDetailPage', { 'goods_id': id });
  }
}
