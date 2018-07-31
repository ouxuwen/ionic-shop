import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackListPage } from './feedback-list';

@NgModule({
  declarations: [
    FeedbackListPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackListPage),
  ],
})
export class FeedbackListPageModule {}
