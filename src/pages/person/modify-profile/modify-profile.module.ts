import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyProfilePage } from './modify-profile';

@NgModule({
  declarations: [
    ModifyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyProfilePage),
  ],
})
export class ModifyProfilePageModule {}
