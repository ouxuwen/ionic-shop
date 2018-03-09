import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCarPage } from './shopping-car';

@NgModule({
  declarations: [
    ShoppingCarPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCarPage),
  ],
})
export class ShoppingCarPageModule {}
