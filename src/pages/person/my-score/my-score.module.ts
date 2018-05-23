import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyScorePage } from './my-score';

@NgModule({
  declarations: [
    MyScorePage,
  ],
  imports: [
    IonicPageModule.forChild(MyScorePage),
  ],
})
export class MyScorePageModule {}
