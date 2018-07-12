import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, AlertController } from 'ionic-angular';
import { GoodsService } from '../../providers/goods';
import { Storage } from '@ionic/storage';


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
  cartData: any = [];
  cartList: any = [];
  isEditing: boolean = false;
  checkedAll: boolean = true; //全选
  totalPrice :any = 0;
  selectNum:any = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public goodsService: GoodsService,
    public storage: Storage,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCarPage');
  }

  ionViewDidEnter() {
    this.getCart();
  }

  // 滑动删除
  delete(itemSliding: ItemSliding, id) {
    this.deleteCartConfirm(id, itemSliding);
  }


  //商品详情
  openDetail(event, id) {
    event.stopPropagation();
    this.navCtrl.push('GoodsDetailPage', {
      goods_id: id
    })
  }



  edit() {
    this.isEditing = true;
  }

  editDone() {
    this.isEditing = false;
  }

  // 修改数量
  changeNum(i, num) {
    this.cartData[i].num += num;
  }

  // 修改商品数量
  cartAdjustNum(cartid, num) {
    this.goodsService.cartAdjustNum({
      cartid: cartid,
      num: num
    }).subscribe(res => {

    })
  }

  // 删除确认
  deleteCartConfirm(cartid, itemSliding?) {
    let alert = this.alertCtrl.create({
      title: '温馨提示',
      message: '亲，你确定要删除吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.deleteCart(cartid);
          }
        }
      ]
    });
    alert.present();
  }

  // 删除购物车
  deleteCart(cartid, itemSliding?) {
    this.goodsService.cartDelete({
      del_id: cartid
    }).subscribe(res => {
      itemSliding && itemSliding.close();

      this.toastCtrl.create({
        message: "删除成功",
        duration: 1500,
        position: 'middle',
        cssClass: 'toast-success'
      }).present()
    })
  }

  // 收藏
  addFav(itemSliding: ItemSliding, i) {
    this.goodsService.addFavorites({
      fav_id: this.cartData[i].goods_id,
      fav_type: 'goods'
    }).subscribe(res => {
      itemSliding.close()
      this.toastCtrl.create({
        message: "添加收藏成功",
        duration: 1000,
        position: 'middle',
        cssClass: 'toast-success'
      }).present()
    })
  }

  //获取购物车内容
  getCart() {
    this.goodsService.cart({}).subscribe(res => {
      let data = res['data'];
      this.cartList = data.list;
      this.cartData = this.cartList['0,'];
      this.cartData.map(ele => {
        if (ele.goods_attribute_id == 1) {
          let sku = ele.sku_name.split(' ');
          ele.sku_name = `柱：${sku[0]} 球：${sku[1]}`
        }
        ele.isChecked = true;
      })
      this.calculatePrice();
      console.log(this.cartData)
    })
  }

  //计算总价
  calculatePrice() {
    this.totalPrice = 0;
    this.selectNum = 0;
    this.cartData.forEach(ele => {
      if (ele.isChecked) {
        this.totalPrice += ele.num * ele.price;
        this.selectNum++;
      }
    })
    this.totalPrice = this.totalPrice.toFixed(2);
  }

  //单项勾选
  singleChange(e){
    this.checkedAll = e;
    this.cartData.forEach(ele =>{
      if(!ele.isChecked){
        this.checkedAll = false;
      }
    });
    this.calculatePrice()
  }

  // 多项勾选
  allChange(e){
    this.cartData.map(ele =>{
      ele.isChecked = e;
    });
    this.calculatePrice()
  }

}
