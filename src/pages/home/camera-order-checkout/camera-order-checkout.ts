import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the CameraOrderCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-order-checkout',
  templateUrl: 'camera-order-checkout.html',
})
export class CameraOrderCheckoutPage {
  hasAddress = false;
  goods_sku_list = [] // 商品列表
  leavemessage = ''; // 留言
  pay_type // 支付方式
  shipping_company_id // 物流公司
  cartData: any;
  totalPrice = 0;
  tagList: any; //购物车id集合 or goodsList
  tag: string; //'cart' 从购物车 'buy_now' 立即购买
  addressDefault: any;
  orderDetail: any; //订单信息
  goodsCount: any = 0;
  goodsTotal: number = 0;
  express: any = 0;
  memberAccount: any;
  couponList = [];
  expressCompanyList: any = [];
  usePoint: boolean = true;
  hideExpress: boolean = true;
  selectExpress = 0;
  showExpress = '';
  num = 0;
  orderImg:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private photoViewer: PhotoViewer
  ) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraOrderCheckoutPage');
  }

  init() {
    this.goodsTotal = 1;
    this.num = 1;
    this.tagList = 999;
    this.orderImg = this.navParams.get('orderImg');
  }

  ionViewDidEnter() {
    this.orderInfo();
  }



  orderInfo() {
    this.goodsCount = 0;
    let params = {
      tag: 'buy_now',
      sku_id: this.tagList,
      num: this.num
    }
    this.orderService.cameraOrderInfo(params).subscribe(res => {
      let data = res['data']
      this.orderDetail = data;
      this.express = Number(data.express);
      this.addressDefault = data.address_default;
      this.memberAccount = data.member_account;

      this.expressCompanyList = data.express_company_list;
      this.cartData = data.itemlist;

      this.goods_sku_list = data.goods_sku_list;
      this.cartData.forEach(el => {
        this.goodsCount += Number(el.num);
      })
      this.getDefaultExpress();
      this.calcTotalPrice();
    })
  }

  getDefaultExpress() {
    this.expressCompanyList.forEach(el => {
      if (el.is_default) {
        this.selectExpress = el.co_id;
        this.showExpress = el.company_name;
      }
    })
  }

  //编辑地址
  editAddress(e) {
    this.navCtrl.push('AddAddressPage', {
      enterType: 'edit',
      addressInfo: e
    })
  }

  //选择地址
  selectAddress() {
    this.navCtrl.push('AddressManagementPage', {
      enterType: 'select'
    })
  }

  // 添加地址
  addAddress() {
    this.navCtrl.push('AddAddressPage', {
      enterType: 'add'
    })
  }



  // 物流
  getExpress(e) {
    this.expressCompanyList.forEach(el => {
      if (el.co_id == e) {
        this.express = Number(el.express_fee);
        this.showExpress = el.company_name;
      }
    });

    this.calcTotalPrice();
  }

  calcTotalPrice() {
    this.totalPrice = Number(this.goodsTotal) + Number(this.express);
    if (this.totalPrice < 0) {
      this.totalPrice = 0;
    }
  }


  createOrder() {
    let params = {
      use_coupon: '', // 优惠券
      integral: '',// 积分
      goods_sku_list: this.goods_sku_list, // 商品列表
      leavemessage: this.leavemessage,// 留言
      pay_type: 1,// 支付方式
      shipping_company_id: this.selectExpress,// 物流公司
      tag: 'buy_now',//'cart' 从购物车 'buy_now' 立即购买
      order_img:this.orderImg
    }
    if (!this.addressDefault) return;

    this.orderService.cameraOrder(params).subscribe(res => {
      this.navCtrl.push('OrderDetailPage', {
        orderId:res['data']
      })

    })
  }

  //商品详情
  openDetail() {
    let options:any = {
      share: true, // default is false
      closeButton: false, // iOS only: default is true
      copyToReference: true // iOS only: default is false
      }
    this.photoViewer.show(this.orderImg, '订单图片',options);
  }

}
