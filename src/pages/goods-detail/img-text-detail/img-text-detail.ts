import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoodsService } from '../../../providers/goods';

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

  navIndex:number = 2;  //2:图文详情 3：评论,
  htmlContent:any;
  goodsId:any;
  commType = 0; //1,2,3 好评，中评，差评
  evaluatesCount:any;
  commentList:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public goodsService:GoodsService
  ) {
    this.navIndex = this.navParams.get('navIndex');
    this.htmlContent = this.navParams.get('content');
    this.goodsId = this.navParams.get('goodsId');
    this.evaluatesCount = this.navParams.get('evaluatesCount');
    console.log(this.navParams)
    if(this.navIndex == 3){
      this.getGoodsComments();
    }
    console.log(this.navIndex);
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

  getGoodsComments(){
    this.goodsService.getGoodsComments({
      comments_type:this.commType,
      goods_id:this.goodsId
    }).subscribe(res=>{
      console.log(res);
      this.commentList = res['data']['data'];
    })
  }
}
