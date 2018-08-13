import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { PersonService } from "../../../providers/person";
/**
 * Generated class for the AddressManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-management',
  templateUrl: 'address-management.html',
})
export class AddressManagementPage {
  addressList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressManagementPage');
  }

  ionViewDidEnter() {
    let bol = this.navCtrl.getPrevious().id == 'AddAddressPage' ? false : true;
    this.getAddress(bol);
  }

  addAddress() {
    this.navCtrl.push("AddAddressPage");
  }

  // 获取地址
  getAddress(bol?) {
    this.personService.memberAddress({}, bol).subscribe(res => {
      this.addressList = res['data']['data'];
      console.log(res)
    })
  }



  // 删除
  deleteAddress(id) {
    this.alertCtrl.create({
      title: '温馨提示',
      message: '亲，你确定要删除吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.personService.memberAddressDelete({ id: id }).subscribe(res => {
              this.getAddress(false);
              this.showToast('删除成功')
            })
          }
        }
      ]
    }).present();
  }

  //设置默认
  setDefault(e) {
    if(e.is_default == 1)return;
    this.personService.updateAddressDefault({ id: e.id }).subscribe(res => {
      if(this.navCtrl.getPrevious().id == 'CheckOutPage'){
        this.navCtrl.pop();
      }else{
        this.getAddress(false);
        this.showToast('设置默认地址成功');
      }
    })
  }

  // 编辑
  editAddress(e) {
    this.navCtrl.push('AddAddressPage', {
      enterType: 'edit',
      addressInfo: e
    })
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
