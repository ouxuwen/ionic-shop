import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckOutPage } from './check-out';

@NgModule({
  declarations: [
    CheckOutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckOutPage),
  ],
})
export class CheckOutPageModule {}
