import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PersonService } from '../../../providers/person';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  feedBack: string;
  memberName: string;
  title:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService,
    public toastCtrl: ToastController
  ) {
    this.memberName = this.navParams.get('member_name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  feedBackList() {
    this.navCtrl.push('FeedbackListPage')
  }

  confirm() {
    let param = {
      member_name: this.memberName,
      consult_content: this.feedBack,
      title:this.title
    }
    if(!this.title || !this.feedBack) return ;
    this.personService.addConsult(param).subscribe(res => {
      this.toastCtrl.create({
        message: '提交成功！',
        duration: 1500,
        position: 'middle',
        cssClass: 'toast-success'
      }).present();
      this.feedBack = '';
      this.title = '';
    })
  }
}
