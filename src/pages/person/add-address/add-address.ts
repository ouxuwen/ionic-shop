import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { areasList } from './areas';
/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {
  default="310000 110100 110101";
  cityColumns: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cityColumns = areasList;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
  }

  selectResult(ev) {
    console.log(this.default)
  }


}
