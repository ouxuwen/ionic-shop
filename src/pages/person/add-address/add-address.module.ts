import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAddressPage } from './add-address';
import { ComponentsModule } from '../../../components/components.module';
import { MultiPickerModule } from 'ion-multi-picker';
@NgModule({
  declarations: [
    AddAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAddressPage),
    ComponentsModule,
    MultiPickerModule
  ],
})
export class AddAddressPageModule {}
