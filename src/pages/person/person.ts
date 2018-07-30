import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PersonService } from '../../providers/person';

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
  userInfo:any;
  historyGoods=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public personService:PersonService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }


  ionViewDidEnter() {
    this.getPersonData();
    this.getHistory()
  }

  getHistory(){
    this.storage.get("historyGoods").then(res=>{
      this.historyGoods = [];
      if(res){
        this.historyGoods = res;
      }

    })
  }

  getPersonData(){
    this.personService.personalData({}).subscribe(res=>{
      this.userInfo = res['data'];

    })
  }

  memberIndexFx() {
    this.personService.memberIndexFx({}).subscribe(res=>{

    })
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
    this.navCtrl.push('FeedbackPage');
  }

  myOrder(i?){
    this.navCtrl.push('OrderPage',{status:i});
  }

  modifyPsd(){
    this.navCtrl.push('ModifyPsdPage');
  }

  myTeam(){
    this.navCtrl.push('MyTeamPage');
  }

  myFav(){
    this.navCtrl.push('MyFavPage');
  }

  myHistory(){
    this.navCtrl.push('MyHistoryPage');
  }

  modifyProfile(){
    this.navCtrl.push('ModifyProfilePage',{
      'userInfo':this.userInfo.member_info.user_info.nick_name,
      'memberImg':this.userInfo.member_img
    });
  }

  logout() {
    console.log(this.navCtrl.parent.parent)
    this.storage.remove('userInfo').then(()=>{
        this.navCtrl.parent.parent.setRoot('LoginPage')
    })
  }
}
