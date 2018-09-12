import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyProfilePage } from './modify-profile';
import { Camera } from '@ionic-native/camera';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ModifyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyProfilePage),
    ComponentsModule
  ],
  providers:[
    Camera
  ]
})
export class ModifyProfilePageModule {}
