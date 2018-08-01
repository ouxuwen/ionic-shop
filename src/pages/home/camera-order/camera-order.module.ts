import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraOrderPage } from './camera-order';
import { Camera } from '@ionic-native/camera'
@NgModule({
  declarations: [
    CameraOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraOrderPage),
  ],
  providers:[
    Camera
  ]
})
export class CameraOrderPageModule {}
