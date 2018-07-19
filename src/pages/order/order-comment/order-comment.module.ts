import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCommentPage } from './order-comment';

@NgModule({
  declarations: [
    OrderCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCommentPage),
  ],
})
export class OrderCommentPageModule {}
