import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  fixContent;
  scrollContent;
  header;
  headerOpacity = 0;
  promoHour: any;
  promoMin: any;
  promoSec: any;
  promoTime: any = 47 * 3500000 + 50000;
  promoList: any = [];
  discountList: any;
  bannerList: any;
  hotList1: any = [];
  hotList2: any = [];
  hotList3: any = [];
  appInfo: any;
  recommendList: any=[];

  couponList: any;
  notice: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiService,
    public storage: Storage
  ) {
    this.init();
  }

  ionViewDidLoad() {

    setInterval(() => {
      this.promoTime -= 1000;
      if (this.promoTime < 0) {
        this.promoTime = 48 * 3600000;
      }
      this.formatTime(this.promoTime);
    }, 1000);
  }

  init() {

    this.api.index().subscribe(res => {
      let data = res['data'];
      this.promoList = data.discount_list;
      this.appInfo = data.web_info;
      this.recommendList = data.goods_recommend_list;
      this.hotList1 = data.goods_hot_list.slice(0, 3);
      this.hotList2 = data.goods_hot_list.slice(3, 6);
      this.hotList3 = data.goods_hot_list.slice(6, 9);
      this.couponList = data.coupon_list;
      this.notice = data.notice;
      this.bannerList = data.plat_adv_list.adv_list;

      this.storage.set('appInfo', this.appInfo);
      console.log(res);
    })


  }


  // 上拉
  doPull(refresher) {
    console.log(refresher.state);
  }



  // 下拉刷新
  doRefresh(refresher) {
    this.fixContent.style.top = "0";
    this.header.style.display = "none";
    this.init();
    setTimeout(() => {
      this.header.style.display = "block";
      refresher.complete();
    }, 2000)

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.fixContent = document.querySelector("page-home ion-refresher");
    this.header = document.querySelector("page-home ion-header");
    this.scrollContent = document.querySelector("page-home .scroll-content");
    this.scrollContent.addEventListener("scroll", (e) => {
      this.headerOpacity = this.scrollContent.scrollTop / 90;
      if (this.headerOpacity > 1) {
        this.headerOpacity = 1;
      }
    })

  }


  formatTime(value) {

    var hour = Math.floor(value / 3600000);
    var minute = Math.floor((value % 3600000) / 60000);
    var second = Math.floor((value % 3600000 % 60000) / 1000);;
    var h = hour > 9 ? hour : "0" + hour;
    var m = minute > 9 ? minute : "0" + minute;
    var s = second > 9 ? second : "0" + second;
    this.promoHour = h;
    this.promoMin = m;
    this.promoSec = s;

  }

  openGoodsList() {
    this.navCtrl.push("GoodsListPage");
  }

  openGoodsDetail(id) {
    this.navCtrl.push("GoodsDetailPage", {
      goods_id: id
    });
  }

}
