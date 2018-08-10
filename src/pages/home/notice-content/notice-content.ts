import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoodsService } from '../../../providers/goods';
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
  articleId:any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public goodsService: GoodsService,
  ) {
    this.articleDetail = this.navParams.get('content');
    this.articleId = this.navParams.get('article_id');
    if(this.articleId){
      this.getArticleContent();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeContentPage');
  }

  getArticleContent(){
    this.goodsService.articleContent({'article_id':this.articleId}).subscribe(res =>{
      this.articleDetail= res['data']['article_info'];
    })
  }
}
