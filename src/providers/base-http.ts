import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, TimeoutError, Subscription } from "rxjs";
import { LoadingController, AlertController } from 'ionic-angular';
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
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "加载中..."
    });
    this.token = localStorage.getItem("token");

  }

  errorHandler(res) {
    if (res.code === 0) {
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      });
      alert.present();
    } else if (res.code === 401) {
      console.log('请重新登录~')
    }
  }

  request(api, options): Observable<Response> {
    return Observable.create(observer => {
      this.loading.present();
      this.http.request("POST", this.url + api, options).subscribe(
        res => {
          if (res['code'] === 1) {
            observer.next(res);
          } else {
            this.errorHandler(res);
          }

        },
        err => {
          let alert = this.alertCtrl.create({
            title: '温馨提示',
            subTitle: "网络故障，请稍后再试......",
            buttons: ['确 定']
          });
          alert.present();
          observer.error(err);
        },
        () => {
          try{
            this.loading.dismiss();
          }catch(err){

          }

        })
    })
  }

  post(api: string, body: any = null): Observable<Response> {
    let token = this.token ? this.token : "6ed20604fe946101be88e205ed5dbfa7"
    const params = new URLSearchParams();
    body = {token,...body};
    if (body) {
      for (const n in body) {
        if (body.hasOwnProperty(n)) {
          params.append(n, body[n]);
        }
      }
    }
    return this.request(api, {
      //params:params,
      body: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },

    })

  }


}
