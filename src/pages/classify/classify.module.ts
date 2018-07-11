import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassifyPage } from './classify';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ClassifyPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassifyPage),
    ComponentsModule
  ],
})
export class ClassifyPageModule {}
