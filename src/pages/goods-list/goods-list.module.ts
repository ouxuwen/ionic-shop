import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsListPage } from './goods-list';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    GoodsListPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsListPage),
    ComponentsModule
  ],
})
export class GoodsListPageModule {}
