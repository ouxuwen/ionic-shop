import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonService } from '../../../providers/person';

/**
 * Generated class for the MyFavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-fav',
  templateUrl: 'my-fav.html',
})
export class MyFavPage {
  goodsList: any;
  pageNo: number = 1;
  canLoadMore: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService
  ) {
    this.getFav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFavPage');
  }

  goGoodsDetail(id) {
    this.navCtrl.push('GoodsDetailPage', { 'goods_id': id });
  }

  getFav(refresher?) {
    let params = {
      type: 0,
      page: this.pageNo
    }
    this.personService.myCollection(params).subscribe(res => {
      if (res['data']['data'].length < 15) {
        this.canLoadMore = false;
      }
      if (refresher) {
        this.goodsList.concat(res['data']['data']);
        refresher.complate();
      } else {
        this.goodsList = res['data']['data'];

      }
    })
  }

  // 上拉
  doInfinite(refresher) {
    if (!this.canLoadMore) return;
    this.pageNo++;
    this.getFav(refresher);
  }


}
