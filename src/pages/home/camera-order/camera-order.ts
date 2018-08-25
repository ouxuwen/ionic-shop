import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { OrderService } from '../../../providers/order';
/**
 * Generated class for the CameraOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-order',
  templateUrl: 'camera-order.html',
})
export class CameraOrderPage {
  orderImg: any;
  isUpload: boolean = false;
  notLogin: any;
  options: CameraOptions = {
    quality:10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: 1,
    targetWidth:400,

  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private storage: Storage,
    private orderService: OrderService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraOrderPage');
  }

  select() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择订单照片',
      buttons: [
        {
          text: '打开相机',
          handler: () => {
            this.camera.getPicture(this.options).then((imageData) => {

              let base64Image = 'data:image/jpeg;base64,' + imageData;
              this.isUpload = false;
              this.orderImg = base64Image;
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
              this.orderImg = base64Image;
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
    if(!this.orderImg)return;
    this.navCtrl.push('CameraOrderCheckoutPage',{
      orderImg:this.orderImg
    })
  }

}
