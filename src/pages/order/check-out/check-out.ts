import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
/**
 * Generated class for the CheckOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-out',
  templateUrl: 'check-out.html',
})
export class CheckOutPage {
  hasAddress = false;
  use_coupon; // 优惠券
  integral = 0; // 积分
  goods_sku_list = [] // 商品列表
  leavemessage = ''; // 留言
  pay_type // 支付方式
  shipping_company_id // 物流公司
  cartData: any = [];
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
  hideCoupon: boolean = true;
  hideExpress: boolean = true;
  pointCut: number = 0;
  couponCut: number = 0;
  selectCoupon;
  selectExpress = 0;
  showCoupon = '';
  showExpress = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService
  ) {

    this.init()
  }

  init() {
    this.cartData = this.navParams.get('cartData');
    this.tag = this.navParams.get('tag');
    this.goodsTotal = this.navParams.get('goodsTotal');
    console.log(this.navParams.get('goodsTotal'))
    this.tagList = this.navParams.get('cartList') ? this.navParams.get('cartList') : this.navParams.get('goodsList');
    this.cartData.forEach(el => {
      this.goodsCount += el.num;

    })

  }

  ionViewDidEnter() {
    this.orderInfo();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }

  pay() { }

  orderInfo() {
    let params = {
      tag: this.tag,
      cart_list: this.tagList
    }
    this.orderService.orderInfo(params).subscribe(res => {
      let data = res['data']
      this.orderDetail = data;
      this.express = data.express;
      this.addressDefault = data.address_default;
      this.memberAccount = data.member_account;
      this.couponList = data.coupon_list;
      this.expressCompanyList = data.express_company_list;
      this.selectCoupon = this.couponList[0].coupon_id;
      this.showCoupon = this.couponList[0].coupon_name;
      this.goods_sku_list = data.goods_sku_list;
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

  // 使用积分
  pointChange(e) {
    if (e) {
      this.integral = this.memberAccount.point;
      let maxCut = this.goodsTotal * 20;
      if (this.integral > maxCut) {
        this.integral = maxCut;
      }
    }
  }

  // 优惠券
  getCoupon(e) {

  }

  // 物流
  getExpress(e) {

  }

  calcTotalPrice() {
    this.totalPrice = Number(this.goodsTotal) + Number(this.express) + Number(this.pointCut) + Number(this.couponCut);
  }


  createOrder() {
    let params = {
      use_coupon: this.selectCoupon, // 优惠券
      integral: this.integral,// 积分
      goods_sku_list: this.goods_sku_list, // 商品列表
      leavemessage: this.leavemessage,// 留言
      pay_type: this.pay_type,// 支付方式
      shipping_company_id: this.selectExpress,// 物流公司
      tag: this.tag,//'cart' 从购物车 'buy_now' 立即购买
    }

    this.orderService.createOrder(params).subscribe(res => {
      console.log(res)
    })
  }
}
