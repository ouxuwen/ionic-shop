import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonService } from '../../../providers/person';
/**
 * Generated class for the MyBalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-balance',
  templateUrl: 'my-balance.html',
})
export class MyBalancePage {
  balanceDetail:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService:PersonService
  ) {

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad MyBalancePage');
    this.getBalanceDetail();
  }


  getBalanceDetail(){
    this.personService.balanceWater().subscribe(res=>{
      this.balanceDetail = res['data'];
    })
  }


  recharge(){
    this.navCtrl.push("RechargeMoneyPage");
  }
}
