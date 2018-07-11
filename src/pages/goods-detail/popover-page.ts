import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { ApiService } from '../../providers/api';

@Component({
    template: `
      <ion-list class="popover-page">
        <ion-item>微信分享</ion-item>
        <ion-item>QQ 分享</ion-item>
      </ion-list>
    `
})
export class PopoverPage {
    constructor(private navParams: NavParams) {

    }
    ngOnInit() {
    }
}