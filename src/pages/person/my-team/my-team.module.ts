import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTeamPage } from './my-team';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    MyTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTeamPage),
    ComponentsModule
  ],
})
export class MyTeamPageModule {}
