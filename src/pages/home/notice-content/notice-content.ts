import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NoticeContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice-content',
  templateUrl: 'notice-content.html',
})
export class NoticeContentPage {
  articleDetail:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.articleDetail = this.navParams.get('content');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeContentPage');
  }

}
