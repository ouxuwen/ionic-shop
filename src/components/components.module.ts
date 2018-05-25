import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ImgLazyLoadComponent } from './img-lazy-load/img-lazy-load';
import { NumberInputComponent } from './number-input/number-input';
import { ChooseModelComponent } from './choose-model/choose-model';
import { SelectAddressComponent } from './select-address/select-address';
@NgModule({
  declarations: [ImgLazyLoadComponent, NumberInputComponent, ChooseModelComponent, SelectAddressComponent],
  imports: [IonicModule, CommonModule],
  exports: [ImgLazyLoadComponent, NumberInputComponent, ChooseModelComponent, SelectAddressComponent]
})
export class ComponentsModule { }
