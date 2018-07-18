import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyHistoryPage } from './my-history';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    MyHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MyHistoryPage),
    ComponentsModule
  ],
})
export class MyHistoryPageModule {}
