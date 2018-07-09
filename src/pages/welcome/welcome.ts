import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  slides = [
    {
      title: "Welcome to the App!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/imgs/guidepage01.png",
    },
    {
      title: "What is Weishi?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/imgs/guidepage02.png",
    },
    {
      title: "What is Weishi Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/imgs/guidepage03.png",
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage:Storage

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  skip() {
    this.storage.set("notFirstEnter", true).then(()=>{
      this.navCtrl.setRoot("LoginPage");
    });

  }
}
