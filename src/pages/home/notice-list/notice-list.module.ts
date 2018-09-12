import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeListPage } from './notice-list';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    NoticeListPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeListPage),
    ComponentsModule
  ],
})
export class NoticeListPageModule {}
