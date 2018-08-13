import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
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
    public http: Http,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public storage: Storage,
    public appCtrl: App,
  ) {
    let current = this.appCtrl.getActiveNavs()[0];

    if (current.parent) {
      this.navCtrl = current.parent
    } else {
      this.navCtrl = current;
    }
  }



  errorHandler(res, params) {
    if (res.code === 0) {
      this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      }).present();
    } else if (res.code === 401) {
      this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      }).present();

      this.storage.remove('userInfo').then(() => {
        this.navCtrl.setRoot("LoginPage");
      });
    } else if (res.code === 403) {

      let pObj = {}
      params.split("&").forEach(el => {
        let arr = el.split('=');
        pObj[arr[0]] = arr[1];
      })
      this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      }).present();
      this.storage.set('userInfo', { ...res.data.userInfo, ...pObj })

    }
  }

  request(api, options, needLoading): Observable<Response> {

    let loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "加载中..."
    });
    return Observable.create(observer => {
      if (needLoading) loading.present();

      this.http.request(this.url + api, options).map(res => res.json()).subscribe(
        res => {
          console.log(res)
          if (needLoading) loading.dismiss();
          if (res['code'] != 1) {
            this.errorHandler(res, options.body);
          } else {
            observer.next(res);
          }
          if ((res['code'] == 403)) {
            observer.next(res);
          }

        },
        err => {
          console.log(err)
          if (needLoading) loading.dismiss();
          this.alertCtrl.create({
            title: '温馨提示',
            subTitle: "网络故障，请稍后再试......",
            buttons: ['确 定']
          }).present();
          observer.error(err);
        },
        () => {
        })
    })
  }

  post(api: string, body: any = null, needLoading: boolean = true): Observable<Response> {

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
          'method':'POST',
          body: params.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
         // withCredentials:true

        }, needLoading).subscribe(res => {
          obser.next(res)
        }, err => {
          obser.error(err)
        })
      })

    })

    return observer;

  }

  postJson(api: string, body: any = null, needLoading: boolean = true): Observable<Response> {

    let observer = Observable.create(obser => {
      this.storage.get('userInfo').then(userInfo => {
        let token = userInfo && userInfo.token ? userInfo.token : ''; //? this.token : "6ed20604fe946101be88e205ed5dbfa7"
        console.log(userInfo)
        let params = new FormData();
        if (body) {
          for (const n in body) {
            if (body.hasOwnProperty(n)) {
              params.append(n, body[n]);
            }
          }
        }
        api = api+'?token='+token
        this.request(api, {
          //params:params,
          method:'POST',
          body: params,
          // headers: new Headers({
          //   'Content-Type': '; charset=UTF-8'
          // })
         // withCredentials:true
        }, needLoading).subscribe(res => {
          obser.next(res)
        }, err => {
          obser.error(err)
        })
      })

    })

    return observer;

  }

}
