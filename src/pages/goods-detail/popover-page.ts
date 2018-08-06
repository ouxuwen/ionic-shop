import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
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
    private qq: QQSDK
  ) {

  }
  ngOnInit() {
  }

  options: QQShareOptions = {
    client: this.qq.ClientType.QQ,
    scene: this.qq.Scene.QQ,
    title: 'This is a title for cordova-plugin-qqsdk',
    url: 'https://cordova.apache.org/',
    image: 'http://6t73q2.natappfree.cc/dj/images/avatar.png',
    description: 'This is  Cordova QQ share description',
  };

  share() {
    this.qq.shareNews(this.options)
      .then(() => {
        alert('shareImage success');
      })
      .catch(error => {
        alert("error:" + error);
      });
  }


  wechat() {
    Wechat.share({
      message: {
        title: "Hi, there",
        description: "This is description.",
        thumb: "http://6t73q2.natappfree.cc/dj/images/avatar.png",
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: "https://cordova.apache.org/"
        }
      },
      scene: Wechat.Scene.TIMELINE   // share to Timeline
    }, () => {
      alert("Success");
    }, (reason) => {
      alert("Failed: " + reason);
    });
  }
}
