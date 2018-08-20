import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBalancePage } from './my-balance';

@NgModule({
  declarations: [
    MyBalancePage,
  ],
  imports: [
    IonicPageModule.forChild(MyBalancePage),
  ],
})
export class MyBalancePageModule {}
