import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyHistoryPage } from './my-history';

@NgModule({
  declarations: [
    MyHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MyHistoryPage),
  ],
})
export class MyHistoryPageModule {}
