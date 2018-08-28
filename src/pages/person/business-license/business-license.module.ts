import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessLicensePage } from './business-license';
import { Camera } from '@ionic-native/camera';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    BusinessLicensePage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessLicensePage),
    ComponentsModule
  ],
  providers:[
    Camera
  ]
})
export class BusinessLicensePageModule { }
