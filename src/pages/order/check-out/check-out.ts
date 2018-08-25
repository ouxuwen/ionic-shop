import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  hideCoupon: boolean = true;
  hideExpress: boolean = true;
  pointCut: number = 0;
  couponCut: number = 0;
  selectCoupon = '';
  selectExpress = 0;
  showCoupon = '';
  showExpress = '';
  num = 0;
  pointConfig: any;
  qiu:string;
  zhu:string;
  additional:any;   //附加参数
  promotionFullMail:any;
  useBalance:boolean = true;
  balance:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController
  ) {

    this.init()
  }

  init() {

    this.tag = this.navParams.get('tag');
    this.goodsTotal = this.navParams.get('goodsTotal');
    this.num = this.navParams.get('num');
    this.tagList = this.navParams.get('cartList') ? this.navParams.get('cartList') : this.navParams.get('goodsList');
    // 眼镜参数
    this.qiu = this.navParams.get('qiu');
    this.zhu = this.navParams.get('zhu');
  }

  ionViewDidEnter() {
    this.orderInfo();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckOutPage');
  }


  orderInfo() {
    this.goodsCount = 0;
    let params = this.tag == 'cart' ?
      {
        tag: this.tag,
        cart_list: this.tagList
      } : {
        tag: this.tag,
        sku_id: this.tagList,
        num: this.num
      }
    if(this.qiu &&　this.zhu){
      params['qiu'] = this.qiu;
      params['zhu'] = this.zhu;
    }
    this.orderService.orderInfo(params).subscribe(res => {
      let data = res['data']
      this.orderDetail = data;
      this.express = Number(data.express);
      this.addressDefault = data.address_default;
      this.memberAccount = data.member_account;
      this.couponList = data.coupon_list;
      this.expressCompanyList = data.express_company_list;
      this.cartData = data.itemlist;
      this.pointConfig = data['point_config'];
      this.promotionFullMail = data.promotion_full_mail;
      if (this.couponList.length > 0) {
        this.selectCoupon = this.couponList[0].coupon_id;
        this.showCoupon = this.couponList[0].coupon_name;
      } else {
        this.showCoupon = '没有可用的优惠券';
      }
      this.goods_sku_list = data.goods_sku_list;
      this.additional = [];
      this.cartData.forEach(el => {
        this.goodsCount += Number(el.num);
        if(el.qiu && el.zhu){
          this.additional.push({
            sku_id:el.sku_id,
            qiu:el.qiu,
            zhu:el.zhu,
            num:el.num
          })
        }
      })
      this.getDefaultExpress();
      this.getCoupon();
      this.balanceChange();
      this.pointChange();

    })
  }

  // 使用默认地址
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
  // 使用余额
  balanceChange(){
    if (this.useBalance) {
      this.balance = this.memberAccount.balance;
      let maxCut = this.goodsTotal + this.express - this.couponCut;
      console.log(this.goodsTotal, this.express, this.couponCut);
      if (this.balance > maxCut) {
        this.balance = maxCut;
      }
      if (maxCut < 0) {
        this.balance = 0;
      }
      this.balance = -this.balance;

    } else {
      this.balance = 0;
    }
    this.balance = Number(this.balance.toFixed(2));
    this.calcTotalPrice();
  }



  // 使用积分
  pointChange() {
    if (this.usePoint) {
      this.integral = this.memberAccount.point;
      let maxCut = (this.goodsTotal + this.express + this.balance - this.couponCut) / this.pointConfig.convert_rate;
      console.log(this.goodsTotal, this.express, this.couponCut);
      if (this.integral > maxCut) {
        this.integral = maxCut;
      }
      if (maxCut < 0) {
        this.integral = 0;
      }
      this.integral = -this.integral;

    } else {
      this.integral = 0;
    }
    this.pointCut = this.integral * this.pointConfig.convert_rate;
    this.pointCut = Number(this.pointCut.toFixed(2));
    this.calcTotalPrice();
  }

  // 优惠券
  getCoupon() {
    this.couponList.forEach(el => {
      if (el.coupon_id == this.selectCoupon) {
        this.couponCut = Number(el.money);
        this.showCoupon = el.coupon_name;
      }
    });
    if (!this.selectCoupon) {
      this.couponCut = 0;
      this.showCoupon = '不使用优惠券';
    }
    // calculate the max balance angain
    this.balanceChange();
    // calculate the max point angain
    this.pointChange();
    // calculate the total price angain
    this.calcTotalPrice()
  }

  // 物流
  getExpress(e) {
    this.expressCompanyList.forEach(el => {
      if (el.co_id == e) {
        this.express = Number(el.express_fee);
        this.showExpress = el.company_name;
      }
    });
    this.balanceChange();
    this.pointChange();
    this.calcTotalPrice();
  }

  calcTotalPrice() {
    let orderRealMoney = Number(this.goodsTotal) + this.balance + Number(this.pointCut) - Number(this.couponCut);
    // 超过包邮额包邮
    if( this.promotionFullMail && this.promotionFullMail.is_open &&  orderRealMoney >= Number(this.promotionFullMail.full_mail_money)){
      this.express = 0;
    }
    this.totalPrice = Number(this.goodsTotal)  + this.balance + Number(this.express) + Number(this.pointCut) - Number(this.couponCut);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
    if (this.totalPrice <= 0 ) {
      this.totalPrice = 0;
    }
  }

  //创建订单
  createOrder() {

    let params = {
      use_coupon: this.selectCoupon, // 优惠券
      integral: -this.integral,// 积分
      account_balance: -this.balance,// 积分
      goods_sku_list: this.goods_sku_list, // 商品列表
      leavemessage: this.leavemessage,// 留言
      pay_type: 1,// 支付方式
      shipping_company_id: this.selectExpress,// 物流公司
      tag: this.tag,//'cart' 从购物车 'buy_now' 立即购买
      additional:this.additional.length == 0?'': JSON.stringify(this.additional)
    }

    if (!this.addressDefault) {
      this.alertCtrl.create({
        title: '温馨提示',
        message: '请添加收货地址',
        buttons: [
          {
            text: '确 定',
            handler: () => {
              this.navCtrl.push('AddAddressPage', {
                enterType: 'add'
              })
            }
          }
        ]
      }).present();
      return;
    }

    this.orderService.createOrder(params).subscribe(res => {
      let length = this.navCtrl.length();
      this.navCtrl.push('PayPage', {
        out_trade_no: res['data'],
        money: this.totalPrice
      }).then(res =>{
        if(this.totalPrice>0){
          this.navCtrl.remove(length-1,1)
        }

      })
      console.log(res)
    })
  }

  //商品详情
  openDetail(event, id) {
    event.stopPropagation();
    this.navCtrl.push('GoodsDetailPage', {
      goods_id: id
    })
  }
}
