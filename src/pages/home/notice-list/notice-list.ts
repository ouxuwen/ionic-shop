import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoodsService } from '../../../providers/goods';
/**
 * Generated class for the NoticeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice-list',
  templateUrl: 'notice-list.html',
})
export class NoticeListPage {
  pid = 1;
  pList:any;
  articleList:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public goodsService: GoodsService,
  ) {

    this.getActicle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeListPage');
  }

  getActicle(){
    this.goodsService.articleCenter({}).subscribe(res =>{
      this.pList = res['data'].platform_help_class;
      this.pid = this.pList[0].class_id;
      this.getClass();
    })
  }

  getClass(){
    this.goodsService.getArticleList({'class_id':this.pid}).subscribe(res =>{
      this.articleList = res['data']['data'];

    })
  }

  view(e){
    this.navCtrl.push("NoticeContentPage",{
      "content":e
    })
  }
}
