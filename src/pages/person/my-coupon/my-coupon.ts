import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonService } from '../../../providers/person';
/**
 * Generated class for the MyCouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-coupon',
  templateUrl: 'my-coupon.html',
})
export class MyCouponPage {
  couponList = [
    {
      "coupon_type_id": 1,
      "shop_id": 0,
      "coupon_name": "test",
      "money": "10.00",
      "count": 10,
      "max_fetch": 1,
      "at_least": "0.00",
      "need_user_level": 0,
      "range_type": 1,
      "is_show": 1,
      "start_time": 1531365232,
      "end_time": 1532142837,
      "create_time": 0,
      "update_time": 0
    },
    {
      "coupon_type_id": 2,
      "shop_id": 0,
      "coupon_name": "goodstes",
      "money": "2.00",
      "count": 22,
      "max_fetch": 1,
      "at_least": "0.00",
      "need_user_level": 0,
      "range_type": 0,
      "is_show": 1,
      "start_time": 1531365311,
      "end_time": 1531970114,
      "create_time": 0,
      "update_time": 0
    }
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService,
  ) {
    this.getCoupon();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCouponPage');
  }

  getCoupon(){
    this.personService.memberCoupon({}).subscribe(res=>{
      this.couponList = res['data'];
    })
  }

}
