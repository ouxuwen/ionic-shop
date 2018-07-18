import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderRefundPage } from './order-refund';

@NgModule({
  declarations: [
    OrderRefundPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderRefundPage),
  ],
})
export class OrderRefundPageModule {}
