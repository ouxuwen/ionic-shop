import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImgTextDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-img-text-detail',
  templateUrl: 'img-text-detail.html',
})
export class ImgTextDetailPage {

  navIndex:number = 2;  //2:图文详情 3：评论
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navIndex = this.navParams.get('navIndex');
    console.log(this.navIndex)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImgTextDetailPage');
  }


  changeIndex(i){
    this.navIndex = i;
  }

  back(){
    this.navCtrl.pop();
  }
}
