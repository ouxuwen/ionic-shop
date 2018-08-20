import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonService } from '../../../providers/person';
import { GoodsService } from '../../../providers/goods';
/**
 * Generated class for the RechargeMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge-money',
  templateUrl: 'recharge-money.html',
})
export class RechargeMoneyPage {
  rechargeList;
  outTradeNo:any;
  selectValue:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService:PersonService,
    public goodsService: GoodsService,
  ) {
    this.getRechargeList();
    this.getPayNo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargeMoneyPage');
  }

  getRechargeList(){
    this.personService.getRechargeList().subscribe(res=>{
      this.rechargeList = res['data'];
     if(res['data'].length>0 ) this.selectValue = res['data'][0].money;
    })
  }


  getPayNo(){
    this.personService.recharge().subscribe(res=>{
      this.outTradeNo = res['data'];
    })
  }


  recharge(){
    let params = {
      recharge_money:this.selectValue,
      out_trade_no:this.outTradeNo
    }
    this.personService.createRechargeOrder(params).subscribe(res =>{
      this.navCtrl.push("PayPage",{
        'out_trade_no':this.outTradeNo,
        'money':this.selectValue,
        'type':'recharge'
      })
    })
  }




}
