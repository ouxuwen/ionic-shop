import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutStorePage } from './about-store';

@NgModule({
  declarations: [
    AboutStorePage,
  ],
  imports: [
    IonicPageModule.forChild(AboutStorePage),
  ],
})
export class AboutStorePageModule {}
