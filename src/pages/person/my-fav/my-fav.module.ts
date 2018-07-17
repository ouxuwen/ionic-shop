import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFavPage } from './my-fav';

@NgModule({
  declarations: [
    MyFavPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFavPage),
  ],
})
export class MyFavPageModule {}
