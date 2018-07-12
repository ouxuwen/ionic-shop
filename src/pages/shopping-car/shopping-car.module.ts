import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCarPage } from './shopping-car';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ShoppingCarPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCarPage),
    ComponentsModule
  ],
})
export class ShoppingCarPageModule {}
