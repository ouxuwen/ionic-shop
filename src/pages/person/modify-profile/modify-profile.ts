import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { PersonService } from '../../../providers/person';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ModifyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-profile',
  templateUrl: 'modify-profile.html',
})
export class ModifyProfilePage {
  userName = '';
  defaultImg = 'assets/imgs/avtar.png'
  userImg = '';
  options: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: 1,
    targetWidth:200,
    targetHeight:200
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {
    this.userName = this.navParams.get('userInfo');
    this.userImg = this.navParams.get('memberImg');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyProfilePage');
  }

  modify() {
    if(!this.userName)return;
    this.personService.modifyProfile({
      'nickname': this.userName,
      'image': this.userImg
    }).subscribe(res => {
      this.alertCtrl.create({
        title: '温馨提示',
        message: '修改成功！',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
    })
  }

  select() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择头像',
      buttons: [
        {
          text: '打开相机',
          handler: () => {
            this.camera.getPicture(this.options).then((imageData) => {
              let base64Image = 'data:image/jpeg;base64,' + imageData;
              this.userImg = base64Image;
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
              this.userImg = base64Image;
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
}
