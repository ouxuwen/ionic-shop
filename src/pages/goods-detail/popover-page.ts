import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';

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

  options : QQShareOptions = {
    client: this.qq.ClientType.QQ,
    scene:  this.qq.Scene.QQ,
    title: 'This is a title for cordova-plugin-qqsdk',
    url: 'https://cordova.apache.org/',
    image: 'https://cordova.apache.org/static/img/cordova_bot.png',
    description: 'This is  Cordova QQ share description',
  };

  share() {

    this.qq.shareImage(this.options)
    .then(() => {
       alert('shareImage success');
    })
    .catch(error => {
      alert("error:"+error);
    });
 }


  wechat() {

  }
}
