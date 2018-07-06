import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import {PersonService} from '../../../providers/person';
/**
 * Generated class for the BusinessLicensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-license',
  templateUrl: 'business-license.html',
})
export class BusinessLicensePage {
  licenseImg: any;
  isUpload: boolean = false;
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: 1
  }
  userInfo: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private storage:Storage,
    private personService:PersonService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessLicensePage');
  }

  ionViewDidEnter(){

  }

  /**
   * 检查账号审核状态
   */
  checkStatus(){
    this.storage.get("userInfo").then(res =>{
      if(res){
        this.userInfo = res;
        if(this.userInfo.license){
          this.isUpload = true;
          this.licenseImg = this.userInfo.license;
          this.personService.login(this.userInfo).subscribe(res =>{
            this.storage.set("userInfo",res['data']);
            this.navCtrl.setRoot("TabsPage");
          })
        }
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
    })
  }


  select() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择营业执照',
      buttons: [
        {
          text: '打开相机',
          handler: () => {
            this.camera.getPicture(this.options).then((imageData) => {

              let base64Image = 'data:image/jpeg;base64,' + imageData;
              this.isUpload = false;
              this.licenseImg = base64Image;
            }, (err) => {

            });
          }
        },
        {
          text: '打开相册',
          handler: () => {
            this.options.sourceType = 0;
            this.camera.getPicture(this.options).then((imageData) => {

              let base64Image = 'data:image/jpeg;base64,' + imageData;
              this.isUpload = false;
              this.licenseImg = base64Image;
            }, (err) => {

            });
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  upload() {
    let params ={
      uid:this.userInfo.uid,
      other_info:this.licenseImg
    }
    this.personService.uploadLicense(params).subscribe(res =>{
      this.isUpload = true;
      this.userInfo['license'] = this.licenseImg;
      this.storage.set("userInfo",this.userInfo);
    })
  }
}
