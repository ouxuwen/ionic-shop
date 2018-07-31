import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PersonService } from '../../../../providers/person';

/**
 * Generated class for the FeedbackListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback-list',
  templateUrl: 'feedback-list.html',
})
export class FeedbackListPage {
  consultList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService,
    public modalCtrl: ModalController
  ) {
    this.getList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackListPage');
  }

  getList() {
    this.personService.consultList().subscribe(res => {
      this.consultList = res['data'].data;
    })
  }

  consultDetail(e) {
    this.modalCtrl.create('FeedbackDetailPage',{data:e}).present();
  }
}
