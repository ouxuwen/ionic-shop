import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeListPage } from './notice-list';

@NgModule({
  declarations: [
    NoticeListPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeListPage),
  ],
})
export class NoticeListPageModule {}
