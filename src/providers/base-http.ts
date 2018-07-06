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
    let current = this.appCtrl.getActiveNav()
    if (current.parent) {
      this.navCtrl = current.parent
    } else {
      this.navCtrl = current;
    }

    console.log(this.appCtrl.getActiveNav())
    this.getToken();

  }

  async getToken() {
    let userInfo = await this.storage.get("userInfo");
    if (userInfo) {
      this.token = userInfo.token;
    }

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
      this.navCtrl.setRoot("LoginPage");
    } else if (res.code === 403) {
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      });
      alert.present();
      this.storage.set('userInfo', params);
      this.navCtrl.setRoot("BusinessLicensePage");
    }
  }

  request(api, options): Observable<Response> {
    console.log(this.appCtrl.getActiveNav())
    let loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "加载中..."
    });
    return Observable.create(observer => {
      loading.present();
      this.http.request("POST", this.url + api, options).subscribe(
        res => {
          loading.dismiss();
          if (res['code'] != 1) {
            this.errorHandler(res, options.body);
          } else {
            observer.next(res);
          }

        },
        err => {
          loading.dismiss();
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

  post(api: string, body: any = null): Observable<Response> {
    let token = this.token //? this.token : "6ed20604fe946101be88e205ed5dbfa7"
    const params = new URLSearchParams();
    body = { token, ...body };
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
