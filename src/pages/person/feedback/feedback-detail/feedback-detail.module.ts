import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackDetailPage } from './feedback-detail';

@NgModule({
  declarations: [
    FeedbackDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackDetailPage),
  ],
})
export class FeedbackDetailPageModule {}
