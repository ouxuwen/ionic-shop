import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
    destinationType: this.camera.DestinationType.DATA_URL ,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType:1
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessLicensePage');
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
             }, (err) => {

             });
          }
        },
        {
          text: '打开相册',
          handler: () => {
            this.options.sourceType =  0;
            this.camera.getPicture(this.options).then((imageData) => {

              let base64Image = 'data:image/jpeg;base64,' + imageData;
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

  }
}
