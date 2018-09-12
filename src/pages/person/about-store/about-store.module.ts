import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutStorePage } from './about-store';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AboutStorePage,
  ],
  imports: [
    IonicPageModule.forChild(AboutStorePage),
    ComponentsModule
  ],
})
export class AboutStorePageModule {}
