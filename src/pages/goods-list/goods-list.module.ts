import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsListPage } from './goods-list';

@NgModule({
  declarations: [
    GoodsListPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsListPage),
  ],
})
export class GoodsListPageModule {}
