import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckOutPage } from './check-out';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    CheckOutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckOutPage),
    ComponentsModule
  ],
})
export class CheckOutPageModule {}
