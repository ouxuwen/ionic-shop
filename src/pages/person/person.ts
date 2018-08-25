import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PersonService } from '../../providers/person';
declare var window:any;
/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  userInfo: any;
  historyGoods = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public personService: PersonService,
    public toastCtrl: ToastController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }


  ionViewDidEnter() {
    this.getPersonData();
    this.getHistory()
  }

  getHistory() {
    this.storage.get("historyGoods").then(res => {
      this.historyGoods = [];
      if (res) {
        this.historyGoods = res;
      }
    })
  }

  getPersonData(refresher?) {
    let bol;
    if (!this.userInfo) {
      bol = true;
    }
    this.personService.personalData({}, bol).subscribe(res => {
      if (refresher) {
        this.refreshing = false;
        refresher.complete();
      }
      this.userInfo = res['data'];
    },err=>{
      if (refresher) {
        this.refreshing = false;
        refresher.complete();
      }
    })
  }

  memberIndexFx() {
    this.personService.memberIndexFx({}).subscribe(res => {
    })
  }

  goMyBalance() {
    this.navCtrl.push('MyBalancePage');
  }

  goMyScore() {
    this.navCtrl.push('MyScorePage');
  }

  goMyAddress() {
    this.navCtrl.push('AddressManagementPage');
  }

  goMyCoupon() {
    this.navCtrl.push('MyCouponPage');
  }

  goAboutStore() {
    this.navCtrl.push('AboutStorePage');
  }

  goFeedback() {
    this.navCtrl.push('FeedbackPage', { 'member_name': this.userInfo.member_info.user_info.nick_name });
  }

  myOrder(i?) {
    this.navCtrl.push('OrderPage', { status: i });
  }

  modifyPsd() {
    this.navCtrl.push('ModifyPsdPage');
  }

  myTeam() {
    this.navCtrl.push('MyTeamPage');
  }

  myFav() {
    this.navCtrl.push('MyFavPage');
  }

  myHistory() {
    this.navCtrl.push('MyHistoryPage');
  }

  modifyProfile() {
    this.navCtrl.push('ModifyProfilePage', {
      'userInfo': this.userInfo.member_info.user_info.nick_name,
      'memberImg': this.userInfo.member_img
    });
  }

  logout() {
    console.log(this.navCtrl.parent.parent)
    this.storage.remove('userInfo').then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage')
    })
    localStorage.removeItem('chatInfo');
  }

  // 签到、
  sign() {
    if (this.userInfo.isSign > 0) {
      return;
    }
    this.personService.signIn({}).subscribe(res => {
      this.toastCtrl.create({
        message: '签到成功！',
        duration: 1500,
        position: 'middle',
        cssClass: 'toast-success'
      }).present();
      this.getPersonData();
    })
  }
  refreshing: boolean = false;
  // 下拉刷新
  doRefresh(refresher) {
    this.refreshing = true;
    this.getPersonData(refresher);
  }

  
  message(){
    if (window.Chatra) {
      window.Chatra('show');
      window.Chatra('openChat')
    }
  }
}
