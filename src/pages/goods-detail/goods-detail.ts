import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';
import { PopoverPage } from './popover-page';
import { PersonService } from '../../providers/person';

/**
 * Generated class for the GoodsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-detail',
  templateUrl: 'goods-detail.html',

})
export class GoodsDetailPage {
  selectValue:any ;
  goodsId: any;
  navIndex: number = 1;
  numVals: number = 1;
  goodsDetail: any;
  cartInfo: any;
  sellProvince: any;
  skuId: any;
  skuName: any;
  skuList: any;
  couponList = [];
  roleList: any = {
    qiu: [],
    zhu: []
  };
  hideDetail: boolean = true;
  isMemberFavGoods: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public goodsService: GoodsService,
    public toastCtrl: ToastController,
    public personService: PersonService,
  ) {

    this.goodsId = this.navParams.get('goods_id');
    this.getGoodsDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsDetailPage');

  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {});
    popover.present({
      ev: ev
    });
  }



  //切换显示
  changeIndex(i) {
    this.navCtrl.push('ImgTextDetailPage',
      {
        "navIndex": i,
        'content': this.goodsDetail.description,
        'goodsId': this.goodsId
      }, {
        direction: "switch"
      })
  }

  log(e) {
    console.log(this.numVals)
  }

  getRoleResult(ev) {
    console.log(ev);
    this.selectValue = ev;
    this.skuList.forEach(el => {
      if (el.attr_value_items_format === ev.zhu.value + ';' + ev.qiu.value) {
        this.skuId = el.sku_id;
        this.skuName = el.sku_name
        console.log(this.skuId)
      }
    })

  }

  choose(ev) {
    ev.stopPropagation();
    document.getElementById('choose').click();
  }


  goToCart() {
    //  this.navCtrl.popToRoot();
    this.navCtrl.setRoot('ShoppingCarPage');
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.navCtrl.push('ImgTextDetailPage', { "navIndex": 2, 'description': this.goodsDetail['description'] })
      infiniteScroll.complete();
    }, 500);
  }

  // 商品详情
  getGoodsDetail() {
    this.goodsService.goodsDetail({ id: this.goodsId }).subscribe(res => {
      let data: any = res['data'];
      this.goodsDetail = data['goods_detail'];
      this.cartInfo = data['cartInfo'];
      this.sellProvince = this.goodsDetail.sell_province;
      this.skuList = this.goodsDetail.sku_list;
      this.isMemberFavGoods = data['is_member_fav_goods'];
      this.couponList = data['goods_coupon_list'];
      //镜片类型
      if (this.goodsDetail.goods_attribute_id == 1) {
        this.roleList.zhu = [];
        this.roleList.qiu = [];
        this.goodsDetail.spec_list.forEach(el => {
          if (el.spec_id == 2) {
            el.value.forEach(element => {
              this.roleList.zhu.push({
                text: element.spec_value_name, value: element.spec_id + ':' + element.spec_value_id
              })
            });
          } else {
            el.value.forEach(element => {
              this.roleList.qiu.push({
                text: element.spec_value_name, value: element.spec_id + ':' + element.spec_value_id
              })
            });
          }
        })
      }
    })
  }

  //添加购物车
  addCart() {
    if (!this.skuId) {
      this.hideDetail = false;
      return;
    }
    if (this.numVals < 1) {
      return;
    }
    let params = {
      'shop_id': this.goodsDetail.shop_id,
      'shop_name': this.goodsDetail.shop_name,
      'trueId': this.goodsDetail.goods_id,
      'goods_name': this.goodsDetail.goods_name,
      'count': this.numVals,
      'select_skuid': this.skuId,
      'select_skuName': this.skuName,
      'price': this.goodsDetail.price,
      'cost_price': this.goodsDetail.cost_price,
      'picture': this.goodsDetail.picture
    }
    this.goodsService.addCart({
      cart_detail: JSON.stringify(params)
    }).subscribe(res => {
      this.cartInfo = res['data']['cart'];
      this.toastCtrl.create({
        message: "添加购物车成功",
        duration: 1500,
        position: 'middle',
        cssClass: 'toast-success'
      }).present()

    })
  }

  fav() {
    if (this.isMemberFavGoods == 0) {
      this.addFav()
    } else {
      this.cancelFav()
    }
  }

  // 收藏
  addFav() {
    this.goodsService.addFavorites({
      fav_id: this.goodsId,
      fav_type: 'goods'
    }).subscribe(res => {
      this.isMemberFavGoods = 1;
      this.toastCtrl.create({
        message: "添加收藏成功",
        duration: 1000,
        position: 'middle',
        cssClass: 'toast-success'
      }).present()
    })
  }

  //取消收藏
  cancelFav() {
    this.goodsService.cancelFavorites({
      fav_id: this.goodsId,
      fav_type: 'goods'
    }).subscribe(res => {
      this.isMemberFavGoods = 0;
      this.toastCtrl.create({
        message: "取消收藏成功",
        duration: 1000,
        position: 'middle',
        cssClass: 'toast-success'
      }).present()
    })
  }






}




