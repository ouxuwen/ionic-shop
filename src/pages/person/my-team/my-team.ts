import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonService } from '../../../providers/person';

/**
 * Generated class for the MyTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-team',
  templateUrl: 'my-team.html',
})
export class MyTeamPage {
  teamCount:number = 0;
  teamPoint:number = 0;
  teamList:any;
  pageNo = 1;
  pageSize = 15;
  canLoadMore:boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personService: PersonService
  ) {
    this.getLevelPoint();
    this.getTeam();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamPage');
  }

  // 获得推广员分佣积分
  getLevelPoint(){
    this.personService.getLevelPoint({}).subscribe(res =>{
      let data = res['data'];
      this.teamCount = data.num;
      this.teamPoint = data.point;
    })
  }

  getTeam(refresher?){
    this.personService.getLevelOne({}).subscribe(res =>{
      if(refresher){
        this.teamList = this.teamList.concat(res['data'].data);
      }else{
        this.teamList = res['data'].data;
      }
      if(res['data'].data.length < this.pageSize - 1 ){
        this.canLoadMore = false;
      }else {
        this.canLoadMore = true;
      }

    })
  }

  // 上拉
  doInfinite(refresher) {
    if (!this.canLoadMore) {refresher.complete();return;};
    this.pageNo++;
    this.getTeam(refresher);
  }

  rule(){
    this.navCtrl.push("NoticeContentPage",{
      "article_id":2
    })
  }

}
