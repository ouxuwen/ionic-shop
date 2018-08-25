import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
declare var window:any;
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  slides = [
    {
      title: "世镜台眼镜商城",
      description: "欢迎来到世镜台眼镜商城,超多精彩，超多优惠!",
      image: "assets/imgs/guidepage03.png",
    },
    {
      title: "在线支付，购物更方便！",
      description: "在线分销赚返现！消费赚积分，积分可用于直接购物！",
      image: "assets/imgs/guidepage01.png",
    },
    {
      title: "蔡司、依视路、明月...",
      description: "镜片种类丰富，各种大牌镜片品牌，价格实惠，任君挑选！",
      image: "assets/imgs/guidepage02.png",
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    if(window.Chatra){
      window.Chatra('hide')
    }
  }

  skip() {
    this.storage.set("notFirstEnter", true).then(()=>{
      this.navCtrl.setRoot("LoginPage");
    });

  }
}
