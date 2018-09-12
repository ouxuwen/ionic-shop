import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraOrderPage } from './camera-order';
import { Camera } from '@ionic-native/camera';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CameraOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraOrderPage),
    ComponentsModule
  ],
  providers:[
    Camera
  ]
})
export class CameraOrderPageModule {}
