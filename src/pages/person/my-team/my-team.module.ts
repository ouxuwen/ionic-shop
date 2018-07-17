import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTeamPage } from './my-team';

@NgModule({
  declarations: [
    MyTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTeamPage),
  ],
})
export class MyTeamPageModule {}
