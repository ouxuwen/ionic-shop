import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgTextDetailPage } from './img-text-detail';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
  declarations: [
    ImgTextDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgTextDetailPage),
    ComponentsModule
  ],
})
export class ImgTextDetailPageModule {}
