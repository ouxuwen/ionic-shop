import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAddressPage } from './add-address';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    AddAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAddressPage),
    ComponentsModule
  ],
})
export class AddAddressPageModule {}
