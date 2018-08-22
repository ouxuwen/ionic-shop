import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';
import { PersonService } from '../../providers/person';
import { Storage } from '@ionic/storage';
import { JPush } from "@jiguang-ionic/jpush";
import { Device } from "@ionic-native/device";

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
  refreshing = false;
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
  recommendList: any = [];
  couponList: any = [];
  notice: any;
  hideNotice:boolean = false;
  pageNo:number = 1;
  canLoadMore:boolean = true;
  goodsList:any;
  index_adv_one:any;
  index_adv_two:any;
  index_adv_three:any;
  // Jpush
  public registrationId: string;

  devicePlatform: string;
  sequence: number = 0;

  tagResultHandler (result) {
    var sequence: number = result.sequence;
    var tags: Array<string> = result.tags == null ? [] : result.tags;
    alert(
      "Success!" + "\nSequence: " + sequence + "\nTags: " + tags.toString()
    );
  };

  aliasResultHandler (result) {
    var sequence: number = result.sequence;
    var alias: string = result.alias;
    alert("Success!" + "\nSequence: " + sequence + "\nAlias: " + alias);
  };

  errorHandler (err) {
    var sequence: number = err.sequence;
    var code = err.code;
    alert("Error!" + "\nSequence: " + sequence + "\nCode: " + code);
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public goodsService: GoodsService,
    public storage: Storage,
    public personService: PersonService,
    public toastCtrl: ToastController,
    public jpush: JPush,
    device: Device

  ) {
    this.init();
    this.devicePlatform = device.platform;

    document.addEventListener(
      "jpush.receiveNotification",
      (event: any) => {
        var content;
        if (this.devicePlatform == "Android") {
          content = event.alert;
        } else {
          content = event.aps.alert;
        }
        // alert("Receive notification: " + JSON.stringify(event));
      },
      false
    );

    document.addEventListener(
      "jpush.openNotification",
      (event: any) => {
        var content;
        if (this.devicePlatform == "Android") {
          content = event.alert;
        } else {
          // iOS
          if (event.aps == undefined) {
            // 本地通知
            content = event.content;
          } else {
            // APNS
            content = event.aps.alert;
          }
        }
        // alert("open notification: " + JSON.stringify(event));
      },
      false
    );

    document.addEventListener(
      "jpush.receiveLocalNotification",
      (event: any) => {
        // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
        var content;
        if (this.devicePlatform == "Android") {
        } else {
          content = event.content;
        }
        // alert("receive local notification: " + JSON.stringify(event));
      },
      false
    );
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

  init(refresher?) {

    this.goodsService.index().subscribe(res => {
      if (refresher) {
        this.refreshing = false;
        refresher.complete();
      }
      this.getGoodsList("",false);
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
      this.index_adv_one = data.index_adv_one.adv_list[0].adv_image;
      this.index_adv_two = data.index_adv_two.adv_list[0].adv_image;
      if(!refresher){
        this.index_adv_three = data.index_adv_three.adv_list[0].adv_image;
      }

      console.log(this.index_adv_one,this.index_adv_three);
      this.storage.set('appInfo', this.appInfo);
    },err =>{
      if (refresher) {
        this.refreshing = false;
        refresher.complete();
      }
    });

  }


  // 下拉刷新
  doRefresh(refresher) {
    this.refreshing = true;
    this.init(refresher);
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.scrollEvent();

  }

  // 注册滚动事件
  scrollEvent() {
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

  // 匹配倒计时
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
  // 商品列表
  openGoodsList() {
    this.navCtrl.push("GoodsListPage");
  }

  // 商品详情
  openGoodsDetail(id) {
    this.navCtrl.push("GoodsDetailPage", {
      goods_id: id
    });
  }

  // 领取优惠券
  bindCoupon(coupon) {
    this.personService.getCoupon({ "coupon_type_id": coupon.coupon_type_id }).subscribe(res => {
      this.toastCtrl.create({
        message: "领取成功",
        duration: 1000,
        position: 'middle',
        cssClass: 'toast-success'
      }).present()
    })
  }
  // 我的订单
  myOrder() {
    this.navCtrl.push('OrderPage');
  }
  // 我的收藏
  myFav() {
    this.navCtrl.push('MyFavPage');
  }

  // 资讯中心
  article(){
    this.navCtrl.push('NoticeListPage');
  }

  // 拍照下单
  cameraOrder(){
    this.navCtrl.push('CameraOrderPage');
  }

  // 加工
  machining(){
    this.navCtrl.push("NoticeContentPage",{
      "article_id":1
    })
  }

  getGoodsList(refresher?,bol?) {
    let params = {
      page: this.pageNo,
    }
    this.goodsService.goodsList(params,bol).subscribe(res => {
      if(refresher)refresher.complete();
      let data = res['data'];
      if (data.goods_list.lenght < 14) {
        this.canLoadMore = false;
      } else {
        this.canLoadMore = true;
      }
      if (refresher){ this.goodsList = this.goodsList.concat(data.goods_list.data);}
      else {this.goodsList = data.goods_list.data;}
    })
  }

  // 上拉
  doInfinite(refresher) {
    if (!this.canLoadMore) return;
    this.pageNo++;
    this.getGoodsList(refresher);

  }
}
