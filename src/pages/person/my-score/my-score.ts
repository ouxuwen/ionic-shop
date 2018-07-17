import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonService } from '../../../providers/person';
/**
 * Generated class for the MyScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-score',
  templateUrl: 'my-score.html',
})
export class MyScorePage {
  scoreDetail:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService:PersonService
  ) {
    this.getScoreDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyScorePage');

  }

  getScoreDetail(){
    this.personService.integralWater({}).subscribe(res=>{
      this.scoreDetail = res['data'];
    })
  }

}
