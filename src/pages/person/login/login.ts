import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { Validators } from "../../../validators/validators";
import { PersonService } from '../../../providers/person';
import { GoodsService } from '../../../providers/goods';
declare var window:any;
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: any;
  appInfo:any;
  loginErrors = {
    'mobileNum': '',
    'password': '',
  };
  validationMessages: any = {
    'password': {
      'required': "请输入密码"
    },
    'mobileNum': {
      'required': "请输入手机号码",
      'phone': "手机号码格式有误"
    },
    'phoneCode': {
      'required': "请输入手机验证码"
    },
    'userName': {
      'required': "请输入姓名"
    },
    'rePassword': {
      'required': "请再次输入密码"
    },
  };

  params: any = {
    user_name: '',
    password: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public personService: PersonService,
    public storage: Storage,
    public appCtrl: App,
    private toastCtrl: ToastController,
    public goodsService:GoodsService
  ) {

  }

  ngOnInit() {
    this.initForm();
    this.goodsService.getAppInfo().subscribe(res=>{
      this.storage.set('appInfo', res['data']);
    })
  }

  ionViewDidLoad() {
    console.log('login', this.navCtrl);
    this.storage.get('appInfo').then(res=>{
      this.appInfo = res;
    })
  }

  ionViewDidEnter(){
    if(window.Chatra){
      window.Chatra('hide')
    }
  }

  // 初始化表单控件
  initForm() {
    this.loginForm = this.formBuilder.group({
      mobileNum: ["", [Validators.required, Validators.phone]],
      password: ["", [Validators.required]]
    });
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data, this.loginErrors));

  }

  //监控错误
  onValueChanged(data, formError) {

    for (const field in formError) {
      formError[field] = '';
      const control = this.loginForm.get(field);
      if (control && control.dirty && !control.valid) {//表单字段已修改或无效
        const messages = this.validationMessages[field];//取出对应字段可能的错误信息
        for (const key in control.errors) { //从errors里取出错误类型，再拼上该错误对应的信息
          messages[key] && (formError[field] += messages[key] + '');
        }
      }
    }

  }

  login() {
    if (this.loginForm.invalid) return;
    this.personService.login(this.params).subscribe(res => {
      if (res['code'] == 1) {
        this.storage.set("userInfo", res['data']).then((res) => {
          this.navCtrl.setRoot("TabsPage");
        });
      } else {
        this.navCtrl.setRoot("BusinessLicensePage", { 'notLogin': 1 });
      }
      localStorage.setItem("chatInfo",JSON.stringify({"user_name":res['data'].userInfo.user_name,"phone":this.params.user_name}));
      if(window.Chatra){
        window.Chatra('updateIntegrationData', {
          name: res['data'].userInfo.user_name,
          "phone":this.params.user_name
        });
        window.Chatra('show');
      }
    })

  }

  register() {
    this.navCtrl.push("RegisterPage");
  }

  findPassword() {
    this.navCtrl.push("FindPasswordPage");
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
