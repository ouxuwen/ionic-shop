import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding  } from 'ionic-angular';

/**
 * Generated class for the ShoppingCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-car',
  templateUrl: 'shopping-car.html',
})
export class ShoppingCarPage {
  cartData:any = [1,1,2];
  pepperoni:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCarPage');
  }


  delete( itemSliding: ItemSliding){
    itemSliding.close();

  }
  openDetail(event){
    event.stopPropagation();

  }

  changeNum(i){

  }
}
