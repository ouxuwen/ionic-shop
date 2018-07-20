import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { CartService } from '../../providers/cartService';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  cartCount: any = '';
  tab1Root = "HomePage";
  tab2Root = "ClassifyPage";
  tab3Root = "ShoppingCarPage";
  tab4Root = "PersonPage";

  constructor(public cartService: CartService) {
    this.cartCount = this.cartService.cartCount;
  }


}
