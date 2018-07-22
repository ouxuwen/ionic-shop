import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyProfilePage } from './modify-profile';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    ModifyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyProfilePage),
  ],
  providers:[
    Camera
  ]
})
export class ModifyProfilePageModule {}
