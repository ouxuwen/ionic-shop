import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, TimeoutError, Subscription } from "rxjs";
import { LoadingController, AlertController, NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { URL } from '../app.config';

/*
  Generated class for the BaseHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseHttpProvider {
  url: string = URL.urlPrefix;
  loading: any;
  token: any;
  navCtrl: NavController;
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public storage: Storage,
    public appCtrl: App,
  ) {
    let current = this.appCtrl.getActiveNavs()[0];
    console.log(this.appCtrl.getActiveNavs())
    if (current.parent) {
      this.navCtrl = current.parent
    } else {
      this.navCtrl = current;
    }

    console.log(this.appCtrl.getActiveNavs())

  }

  getToken() {
    this.token = this.storage.get("token");
  }

  errorHandler(res, params) {
    if (res.code === 0) {
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      });
      alert.present();
    } else if (res.code === 401) {
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      });
      alert.present();

      this.storage.remove('userInfo').then(()=>{
        this.navCtrl.setRoot("LoginPage");
      });
    } else if (res.code === 403) {

      let pObj = {}
      params.split("&").forEach(el => {
        let arr = el.split('=');
        pObj[arr[0]] = arr[1];
      })
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      });
      alert.present();
      this.storage.set('userInfo', { ...res.data.userInfo, ...pObj })

    }
  }

  request(api, options,needLoading): Observable<Response> {

    let loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "加载中..."
    });
    return Observable.create(observer => {
      if(needLoading)loading.present();
      this.http.request("POST", this.url + api, options).subscribe(
        res => {
          if(needLoading)loading.dismiss();
          if (res['code'] != 1) {
            this.errorHandler(res, options.body);
          } else {
            observer.next(res);
          }
          if((res['code'] == 403)){
            observer.next(res);
          }

        },
        err => {
          if(needLoading)loading.dismiss();
          let alert = this.alertCtrl.create({
            title: '温馨提示',
            subTitle: "网络故障，请稍后再试......",
            buttons: ['确 定']
          });
          alert.present();
          observer.error(err);
        },
        () => {
        })
    })
  }

  post(api: string, body: any = null,needLoading:boolean = true): Observable<Response> {

    let observer = Observable.create(obser => {
      this.storage.get('userInfo').then(userInfo => {
        let token = userInfo && userInfo.token ? userInfo.token : ''; //? this.token : "6ed20604fe946101be88e205ed5dbfa7"
        console.log(userInfo)
        const params = new URLSearchParams();
        body = { token, ...body };
        if (body) {
          for (const n in body) {
            if (body.hasOwnProperty(n)) {
              params.append(n, body[n]);
            }
          }
        }
        this.request(api, {
          //params:params,
          body: params.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          }
        },needLoading).subscribe(res => {
          obser.next(res)
        }, err => {
          obser.error(err)
        })
      })

    })

    return observer;

  }


}
