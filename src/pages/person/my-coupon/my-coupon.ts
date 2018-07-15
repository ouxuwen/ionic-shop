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
  couponList = [];
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
