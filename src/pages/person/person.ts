import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }

  login() {
    let profileModal = this.modalCtrl.create("LoginPage");
    profileModal.present();
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

  logout() {
    this.storage.remove('userInfo').then(()=>{
      this.navCtrl.setRoot('LoginPage')
    })
  
  }
}
