import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';

@Component({
  template: `
    <ion-list class="popover-page">
      <ion-item>微信分享</ion-item>
      <ion-item>QQ 分享</ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(private navParams: NavParams) {

  }
  ngOnInit() {
  }
}
/**
 * Generated class for the GoodsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-detail',
  templateUrl: 'goods-detail.html',

})
export class GoodsDetailPage {
  navIndex: number = 1;
  numVals: number = 1;
  roleList:any = {
    qiu:[
      {text:"0.0",value:1},
      {text:"1.0",value:2},
      {text:"2.0",value:3},
      {text:"3.0",value:4}
    ],
    zhu:[
      {text:"1.0",value:1},
      {text:"2.0",value:2},
      {text:"3.0",value:3},
      {text:"4.0",value:4}
    ]
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      showBackdrop: true,
      spinner: "crescent",
      content: ``
    });

    //loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsDetailPage');
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {});

    popover.present({
      ev: ev
    });
  }

  //切换显示
  changeIndex(i) {
    this.navCtrl.push('ImgTextDetailPage',{"navIndex":i},{
      direction:"switch"
    })
  }

  log(e) {
    console.log(this.numVals)
  }

  getRoleResult(ev){
    console.log(ev)
  }

  choose(ev){
    ev.stopPropagation();
    document.getElementById('choose').click();
  }


  goToCart(){
    //  this.navCtrl.popToRoot();
    this.navCtrl.setRoot('ShoppingCarPage');
  }

  doInfinite(infiniteScroll){

    setTimeout(() => {
      this.navCtrl.push('ImgTextDetailPage',{"navIndex":2},{

      })


      infiniteScroll.complete();
    }, 500);


  }
}




