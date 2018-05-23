import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgTextDetailPage } from './img-text-detail';

@NgModule({
  declarations: [
    ImgTextDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgTextDetailPage),
  ],
})
export class ImgTextDetailPageModule {}
