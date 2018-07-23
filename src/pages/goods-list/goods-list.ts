import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';

/**
 * Generated class for the GoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html',
})
export class GoodsListPage {
  fixContent;
  scrollContent;
  goodsList: any = [];
  canLoadMore: boolean = true;
  /******多条件筛选*******/
  keyWrods = ''; //关键字
  controlType = ''; //标签
  categoryId = ''; // 商品分类
  brandId = ''; // 品牌
  order = ''; // 商品排序分类
  sort = 'desc'; // 商品排序分类 asc升序
  pageNo = 1;
  minPrice = ''; // 价格区间,最小
  maxPrice = ''; // 最大
  attr = ''; // 属性值
  spec = ''; // 规格值

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public goodsService: GoodsService,

  ) {

    this.categoryId = navParams.get('category_id') ? navParams.get('category_id') : '';
    this.getGoodsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsListPage');

  }
  onInput(event) {

  }

  goGoodsDetail(id) {
    this.navCtrl.push('GoodsDetailPage', { 'goods_id': id });
  }

  getGoodsList(refresher?) {
    let params = {
      category_id: this.categoryId, // 商品分类
      brand_id: this.brandId,// 品牌
      order: this.order, // 商品排序分类
      sort: this.sort, // 商品排序分类
      page: this.pageNo,
      min_price: this.minPrice,// 价格区间,最小
      max_price: this.maxPrice,// 最大
      attr: this.attr, // 属性值
      spec: this.spec, // 规格值
      keyword: this.keyWrods,
      controlType: this.controlType
    }

    this.goodsService.goodsList(params).subscribe(res => {
      if(refresher)refresher.complete();
      let data = res['data'];
      if (data.goods_list.lenght < 14) {
        this.canLoadMore = false;
      } else {
        this.canLoadMore = true;
      }
      if (this.pageNo > 1) this.goodsList = this.goodsList.concat(data.goods_list.data);
      else this.goodsList = data.goods_list.data;
    })
  }

  reset() {
    this.keyWrods = ''; //关键字
    this.controlType = ''; //标签
    this.categoryId = ''; // 商品分类
    this.brandId = ''; // 品牌
    this.order = ''; // 商品排序分类
    this.sort = 'desc'; // 商品排序分类 asc升序
    this.pageNo = 1;
    this.minPrice = ''; // 价格区间,最小
    this.maxPrice = ''; // 最大
    this.attr = ''; // 属性值
    this.spec = ''; // 规格值
    this.getGoodsList();

  }



  orderChange(e) {
    console.log(this.sort)

  }

  // 上拉
  doInfinite(refresher) {
    if (!this.canLoadMore) return;
    this.pageNo++;
    this.getGoodsList();

  }



  // 下拉刷新
  doRefresh(refresher) {
    this.pageNo = 1;
    this.getGoodsList(refresher);
  }


}
