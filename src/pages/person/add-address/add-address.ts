import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { areasList } from './areas';
import { PersonService } from "../../../providers/person";
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
  default = "1 1 1";
  canNextStep: boolean = false;
  cityColumns: any;
  enterType: string = 'add'; //edit or add
  addressInfo: any = {
    consigner: '',
    mobile: '',
    province: 1,
    city: 1,
    district: 1,
    address: '',
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService,
    public toastCtrl: ToastController
  ) {
    this.cityColumns = areasList;
    this.enterType = navParams.get('enterType') ? navParams.get('enterType') : 'add';
    if (navParams.get('addressInfo')) {

      this.addressInfo = navParams.get('addressInfo');

      this.default = `${this.addressInfo.province} ${this.addressInfo.city} ${this.addressInfo.district}`;
      this.checkValid();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
  }

  // 选择地址
  selectResult(ev) {
    let _list = ev.split(' ');
    this.addressInfo.province = _list[0];
    this.addressInfo.city = _list[1];
    this.addressInfo.district = _list[2];
    console.log(this.addressInfo)
  }

  // 检查有效性
  checkValid() {

    if (!this.addressInfo.mobile || !this.addressInfo.address || !this.addressInfo.consigner) {
      this.canNextStep = false;
      return;
    }

    this.canNextStep = true;
  }

  // 添加
  addAddress() {
    if (!this.canNextStep) return;
    this.personService.addMemberAddress(this.addressInfo).subscribe(res => {
      this.navCtrl.pop().then(() => {
        this.showToast('添加成功')
      })
    })
  }
  // 更新
  editAddress() {
    if (!this.canNextStep) return;
    this.personService.updateMemberAddress(this.addressInfo).subscribe(res => {
      this.navCtrl.pop().then(() => {
        this.showToast('更新成功')
      })
    })
  }

  nextStep() {
    if (this.enterType == 'add') {
      this.addAddress()
    } else {
      this.editAddress()
    }
  }

  showToast(content) {
    this.toastCtrl.create({
      message: content,
      duration: 1500,
      position: 'middle',
      cssClass: 'toast-success'
    }).present()
  }

}
