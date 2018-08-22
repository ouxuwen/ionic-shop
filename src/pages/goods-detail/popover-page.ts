import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ToastController } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';
import { Storage } from '@ionic/storage';
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
  appInfo: any;

  options: QQShareOptions = {
    client: this.qq.ClientType.QQ,
    scene: this.qq.Scene.QQ,
    title: '唯视光学',
    url: 'http://www.szweishi.com/',
    image: 'http://www.szweishi.com/images/icon.png',
    description: '唯视光学在线眼镜商城',
  };

  wechatOptions = {
    message: {
      title: "唯视光学",
      description: "唯视光学在线眼镜商城",
      thumb: "http://www.szweishi.com/images/icon.png",
      media: {
        type: Wechat.Type.WEBPAGE,
        webpageUrl: "http://www.szweishi.com/"
      }
    },
    scene: Wechat.Scene.TIMELINE   // share to Timeline
  };
  constructor(
    private navParams: NavParams,
    private qq: QQSDK,
    private alertCtrl: AlertController,
    public storage: Storage,
  ) {

  }
  ngOnInit() {
  }

  getStorage(callback) {
    this.storage.get('appInfo').then(res => {
      console.log(res)
      this.appInfo = res;
      this.options.url = this.appInfo.web_url
      this.options.image = this.appInfo.logo;
      this.options.title = this.appInfo.title;
      this.options.description = this.appInfo.web_desc;
      this.wechatOptions.message.thumb = this.appInfo.logo;
      this.wechatOptions.message.media.webpageUrl = this.appInfo.web_url;
      this.wechatOptions.message.title = this.appInfo.title;
      this.wechatOptions.message.description = this.appInfo.web_desc;
      callback()
    });
  }


  share() {
    this.getStorage(() => {
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
    })

  }


  wechat() {
    this.getStorage(() => {
      Wechat.share(this.wechatOptions, () => {
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
    })
  }

}
