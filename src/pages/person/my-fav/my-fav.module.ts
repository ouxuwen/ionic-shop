import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFavPage } from './my-fav';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    MyFavPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFavPage),
    ComponentsModule
  ],
})
export class MyFavPageModule {}
