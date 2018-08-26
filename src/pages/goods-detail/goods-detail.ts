import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';
import { OrderService } from '../../providers/order';
import { PopoverPage } from './popover-page';
import { PersonService } from '../../providers/person';
import { Storage } from '@ionic/storage';
import { CartService } from '../../providers/cartService';
declare var window:any;
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
  selectValue: any = {"qiu":{"text":"0.00","value":"0.00","columnIndex":0},"zhu":{"text":"0.00","value":"0.00","columnIndex":1}};
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
  tag = '';
  evaluatesCount:any;
  appInfo:any;
  isGlasses:boolean = false; //是否是镜片
  specList:any = [];
  selectSku:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public goodsService: GoodsService,
    public toastCtrl: ToastController,
    public personService: PersonService,
    public storage: Storage,
    public cartService:CartService,
    public orderService:OrderService
  ) {
    this.storage.get('appInfo').then(res =>{
      this.appInfo = res;
    });
    this.goodsId = this.navParams.get('goods_id');
    this.getGoodsDetail();
  }

  setHistory(goods){
    this.storage.get('historyGoods').then(res =>{
      let historyGoods = []
      if(res){
        historyGoods = res;
      }
      historyGoods = historyGoods.filter(el=>{
        return el.goods_id != goods.goods_id;
      })
      historyGoods.unshift(goods);
      this.storage.set('historyGoods',historyGoods);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsDetailPage');

  }

  ionViewDidLeave(){
    this.hideDetail = true;
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
        'goodsId': this.goodsId,
        'evaluatesCount':this.evaluatesCount
      }, {
        direction: "switch"
      })
  }

  log(e) {
    console.log(this.numVals)
  }

  getRoleResult(ev) {
    console.log(JSON.stringify(ev));
    // this.selectValue = ev;
    // this.skuList.forEach(el => {
    //   if (el.attr_value_items_format === ev.zhu.value + ';' + ev.qiu.value) {
    //     this.skuId = el.sku_id;
    //     this.skuName = el.sku_name
    //   }
    // })

  }

  choose(ev) {
    ev.stopPropagation();
    document.getElementById('choose').click();
  }


  goToCart() {
    this.navCtrl.popToRoot();
    // this.navCtrl.setRoot('ShoppingCarPage');

    this.navCtrl.parent.select(2);
    console.log(this.navCtrl.parent);

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.navCtrl.push('ImgTextDetailPage', { "navIndex": 2, 'description': this.goodsDetail['description'] })
      infiniteScroll.complete();
    }, 300);
  }

  // 商品详情
  getGoodsDetail() {
    this.goodsService.goodsDetail({ id: this.goodsId }).subscribe(res => {
      let data: any = res['data'];
      this.goodsDetail = data['goods_detail'];
      this.cartInfo = data['cartInfo'];
      this.cartService.cartCount = this.cartInfo.num;
      this.sellProvince = this.goodsDetail.sell_province;
      this.skuList = this.goodsDetail.sku_list;
      this.isMemberFavGoods = data['is_member_fav_goods'];
      this.couponList = data['goods_coupon_list'];
      this.evaluatesCount = data['evaluates_count'];
      //镜片类型
      if (this.goodsDetail.goods_attribute_id == 1) {
        this.isGlasses = true;
        this.roleList.zhu = [];
        this.roleList.qiu = [];
        // 原本打算镜片规格也用传统方法设置，但是数量太多了导致爆炸。
        // this.goodsDetail.spec_list.forEach(el => {
        //   if (el.spec_id == 2) {
        //     el.value.forEach(element => {
        //       this.roleList.zhu.push({
        //         text: element.spec_value_name, value: element.spec_id + ':' + element.spec_value_id
        //       })
        //     });
        //   } else {
        //     el.value.forEach(element => {
        //       this.roleList.qiu.push({
        //         text: element.spec_value_name, value: element.spec_id + ':' + element.spec_value_id
        //       })
        //     });
        //   }
        // });
        this.goodsDetail.zhu.split(',').forEach(el=>{
          this.roleList.zhu.push({
            text: el, value: el
          })
        })
        this.goodsDetail.qiu.split(',').forEach(el=>{
          this.roleList.qiu.push({
            text: el, value: el
          })
        })
      }else{
        this.isGlasses = false;
        // this.specList = this.goodsDetail.spec_list;
        // this.selectSku = [];
        // this.specList.forEach((ele,index)=>{
        //   this.selectSku[index] = ele.value[0].spec_id +':'+ ele.value[0].spec_value_id;
        // })
        // this.calcSku();
        // console.log(this.selectSku)
      }
      this.specList = this.goodsDetail.spec_list;
      this.selectSku = [];
      this.specList && this.specList.forEach((ele,index)=>{
        this.selectSku[index] = ele.value[0].spec_id +':'+ ele.value[0].spec_value_id;
      })
      this.calcSku();
      console.log(this.selectSku)
      this.setHistory(this.goodsDetail);
    })
  }

  //添加购物车
  addCart() {

    if(this.skuId == 999){
      this.toastCtrl.create({
        message: "亲，拍照订单不能直接拍的哦~",
        duration: 2500,
        position: 'middle',
        cssClass: 'toast-error'
      }).present()
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
      'picture': this.goodsDetail.picture,
    }
    //眼镜类型增加镜片参数
    if(this.isGlasses){
      params['zhu'] = this.selectValue.zhu.value;
      params['qiu'] = this.selectValue.qiu.value;
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

  //立即购买
  buyNow() {

    if(this.skuId == 999){
      this.toastCtrl.create({
        message: "亲，拍照订单不能直接拍的哦~",
        duration: 1500,
        position: 'middle',
        cssClass: 'toast-error'
      }).present()
      return;
    }

    if (this.numVals < 1) {
      return;
    }
    //虚拟商品
    if(this.goodsDetail.goods_type == 0){
      let params = {
        "goods_sku_list":this.goodsDetail.sku_list[0].sku_id + ":" +this.numVals,

      };
      this.orderService.virtualOrderCreate(params).subscribe(res =>{
        this.navCtrl.push('PayPage', {
          'out_trade_no':res['data'],
          'money':this.goodsDetail.promotion_price,
        })
      })


    }else{
       //实物商品
      let params = {
        'tag':this.tag,
        'goodsTotal': this.numVals * Number(this.goodsDetail.promotion_price),
        'goodsList': [this.skuId],
        'num': this.numVals
      };
      if(this.isGlasses){
        params['zhu'] = this.selectValue.zhu.value;
        params['qiu'] = this.selectValue.qiu.value;
      }
      this.navCtrl.push('CheckOutPage', params)
    }

  }

  actionConfirm(){
    if(!this.skuId){
      this.toastCtrl.create({
        message: "亲，请选择规格~",
        duration: 1500,
        position: 'middle',
        cssClass: 'toast-error'
      }).present();
      return;
    }
    if(this.tag == 'cart'){
      this.addCart()
    }else{
      this.buyNow();
    }
  }

  calcSku(){
    let result = this.skuList.filter(ele =>{
      return ele.attr_value_items_format == this.selectSku.join(';');
    })
    this.skuId = result[0].sku_id;
    console.log('sku:',this.skuId)
    console.log('num:',this.numVals)
  }


  message(){
    if (window.Chatra) {
      window.Chatra('show');
      window.Chatra('openChat')
    }
  }

}




