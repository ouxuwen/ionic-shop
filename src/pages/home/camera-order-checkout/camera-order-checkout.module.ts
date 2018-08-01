import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraOrderCheckoutPage } from './camera-order-checkout';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CameraOrderCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraOrderCheckoutPage),
    ComponentsModule
  ],
  providers:[

  ]
})
export class CameraOrderCheckoutPageModule {}
