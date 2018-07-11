import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api';

/**
 * Generated class for the ClassifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-classify',
  templateUrl: 'classify.html',
})
export class ClassifyPage {
  categoryList:any = [];
  childList:any  = [];
  categoryId = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiService: ApiService
  ) {
    this.goodsCategoryList()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyPage');
  }

  goodsCategoryList(){
    this.apiService.goodsCategoryList({}).subscribe(res=>{
      console.log(res);
      this.categoryList = res['data'];
      this.childList = this.categoryList[0].child_list;
    })
  }

  changeCategory(i){
    this.categoryId = i;
    this.childList = this.categoryList[i].child_list;
  }

  getCategoryChildGoods(id){
    this.apiService.getCategoryChildGoods({id:id}).subscribe(res=>{
      console.log(res)
    })
  }

  goodsList(id){
    this.navCtrl.push('GoodsListPage',{
      category_id:id
    })
  }
}
