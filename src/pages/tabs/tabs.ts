import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  cartCount:any = 0;
  tab1Root = "HomePage";
  tab2Root = "ClassifyPage";
  tab3Root = "ShoppingCarPage";
  tab4Root = "PersonPage";
  constructor() {

  }
}
