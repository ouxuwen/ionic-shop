import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefundDetailPage } from './refund-detail';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    RefundDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RefundDetailPage),
    ComponentsModule
  ],
})
export class RefundDetailPageModule {}
