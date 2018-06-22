import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "AddressManagementPage";
  tab2Root = "ClassifyPage";
  tab3Root = "ShoppingCarPage";
  tab4Root = "PersonPage";
  constructor() {

  }
}
