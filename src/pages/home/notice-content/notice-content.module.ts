import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeContentPage } from './notice-content';

@NgModule({
  declarations: [
    NoticeContentPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeContentPage),
  ],
})
export class NoticeContentPageModule {}
