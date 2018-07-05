import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessLicensePage } from './business-license';
import { Camera } from '@ionic-native/camera'
@NgModule({
  declarations: [
    BusinessLicensePage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessLicensePage),

  ],
  providers:[
    Camera
  ]
})
export class BusinessLicensePageModule { }
