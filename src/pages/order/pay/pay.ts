import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderService } from '../../../providers/order';
declare var cordova: any;
/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  payMoney: number = 0;
  no: number;
  payMethod = 'ALIPAY';
  orderId: number;
  outTradeNo: number;
  paySuccess:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderService: OrderService,
    public alertCtrl: AlertController

  ) {
    console.log(this.navParams)
    this.no = this.navParams.get('no');
    this.payMoney = this.navParams.get('money');
    this.orderId = this.navParams.get('order_id');
    this.outTradeNo = this.navParams.get('out_trade_no');
    //this.payMethod = this.navParams.get('payMethod') ? this.navParams.get('payMethod') : 'ALIPAY';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }

  pay() {
    if (this.payMethod == 'ALIPAY') {
      this.orderService.mobileAlipay({ 'no': this.outTradeNo }).subscribe(res => {
        console.log(res);
        // var str ='alipay_sdk=alipay-sdk-php-20180705&biz_content=%7B%22body%22%3A%22weishi%E8%AE%A2%E5%8D%95%22%2C%22subject%22%3A+%22weishi%E8%AE%A2%E5%8D%95%22%2C%22out_trade_no%22%3A+%22153219182820941000%22%2C%22timeout_express%22%3A+%2230m%22%2C%22total_amount%22%3A+%2220.20%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fqd8bia.natappfree.cc%2Fionic-shop%2Falipay.php&sign_type=RSA2&timestamp=2018-07-22+00%3A50%3A30&version=1.0&sign=EvdG3pCTF0MPFNNcVOA%2BwgiQ1xeZxNRswKiZMI73uSTG2H4FhVok9eO%2FMyf5MGd7sigkwsF%2BYvp9wEDQewo9y34hOquMnbqX8d4p8D2%2BriGQJlEqnO6hjwwgpPxLp0Niejn07CS4jj7vqDrVxBirfkk8gwN60X8LsYdhX7ons0U%3D';
        try {
          this.alipayHandler(res['data'].url)
        } catch (err) {
          // alert(err)
        }

      })
    }
  }


  alipayHandler(sign) {
    cordova.plugins.alipay.payment(sign,(res) => {
      //alert(JSON.stringify(res))
      let message = '';
      if(res.resultStatus == 9000){
        this.paySuccess = true;
        this.navCtrl.push('PayResultPage',{
          paySuccess:this.paySuccess,
          no:this.outTradeNo,
          orderId:this.orderId,
          money:this.payMoney
        })

      }else{
        this.paySuccess = false;
        this.showResult();
      }
      

    }, (err) => {
      this.paySuccess = false;
      this.showResult();
    })
  }

  showResult(){
    let alert = this.alertCtrl.create({
      title: '支付情况',
      message: '支付遇到了问题？',
      buttons: [
        {
          text: '取消',
          role:'cancel'
        },
        {
          text: '已完成支付',
          handler: () => {
            this.navCtrl.push('PayResultPage',{
              paySuccess:this.paySuccess,
              no:this.outTradeNo,
              orderId:this.orderId,
              money:this.payMoney
            })
          }
        }
      ]
    }).present();
  }

  canGoBack(){
    if(this.paySuccess){return false;}
    else{return true}
  }
}
