import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressManagementPage } from './address-management';

@NgModule({
  declarations: [
    AddressManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressManagementPage),
  ],
})
export class AddressManagementPageModule {}
