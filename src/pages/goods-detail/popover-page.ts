import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ToastController } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';
declare var Wechat: any;
@Component({
  template: `
      <ion-list class="popover-page">
        <ion-item (click)="wechat()">微信分享</ion-item>
        <ion-item (click)="share()">QQ 分享</ion-item>
      </ion-list>
    `
})
export class PopoverPage {
  constructor(
    private navParams: NavParams,
    private qq: QQSDK,
    private alertCtrl: AlertController,
  ) {

  }
  ngOnInit() {
  }

  options: QQShareOptions = {
    client: this.qq.ClientType.QQ,
    scene: this.qq.Scene.QQ,
    title: '唯视光学',
    url: 'http://www.szweishi.com/',
    image: 'http://www.szweishi.com/images/drawable-xxxhdpi-icon.png',
    description: '唯视光学在线眼镜商城',
  };

  share() {
    this.qq.shareNews(this.options)
      .then(() => {
        this.alertCtrl.create({
          title: '温馨提示',
          subTitle: "分享成功！",
          buttons: ['确 定']
        }).present();

      })
      .catch(error => {

        this.alertCtrl.create({
          title: '温馨提示',
          subTitle: "分享失败：" + error,
          buttons: ['确 定']
        }).present();

      });
  }


  wechat() {
    Wechat.share({
      message: {
        title: "唯视光学",
        description: "唯视光学在线眼镜商城",
        thumb: "http://www.szweishi.com/images/drawable-xxxhdpi-icon.png",
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: "http://www.szweishi.com/"
        }
      },
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, () => {
      this.alertCtrl.create({
        title: '温馨提示',
        subTitle: "分享成功！",
        buttons: ['确 定']
      }).present();
    }, (reason) => {
      this.alertCtrl.create({
        title: '温馨提示',
        subTitle: "分享失败：" + reason,
        buttons: ['确 定']
      }).present();
    });
  }
}
