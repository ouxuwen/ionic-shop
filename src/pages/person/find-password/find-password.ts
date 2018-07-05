import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Validators } from "../../../validators/validators";
/**
 * Generated class for the FindPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html',
})
export class FindPasswordPage {

  findPsdForm: any;
  captchaText:any = "获取验证码";
  isWaiting:boolean = false; //等验证码
  waitTime:any = 60;
  findPsdErrors = {
    'mobileNum': '',
    'password': '',
    'phoneCode':'',
    'rePassword':''
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
      'required': "请再次输入密码",
      'notMatch':"两次输入不一致"
    },
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPasswordPage');
  }


  ngOnInit(){
    this.initForm();
  }

   // 初始化表单控件
   initForm() {
    this.findPsdForm = this.formBuilder.group({
      mobileNum: ["", [Validators.required, Validators.phone]],
      password: ["", [Validators.required]],
      rePassword: ["", [Validators.required]],
      phoneCode: ["", [Validators.required]]
    });
    this.findPsdForm.valueChanges.subscribe(data => this.onValueChanged(data, this.findPsdErrors));

  }

  //监控错误
  onValueChanged(data, formError) {
    for (const field in formError) {
      formError[field] = '';
      const control = this.findPsdForm.get(field);
      if (control && control.dirty && !control.valid) {//表单字段已修改或无效
        const messages = this.validationMessages[field];//取出对应字段可能的错误信息
        for (const key in control.errors) { //从errors里取出错误类型，再拼上该错误对应的信息
          messages[key] && (formError[field] += messages[key] + '');
        }
      }
    }

  }

  back(){
    this.navCtrl.pop();
  }

  findPassword(){

  }

  sendCaptcha(){
    if(this.isWaiting)return;
    this.isWaiting = true;
    let timer = setInterval(()=>{
      this.waitTime--;
      this.captchaText = `${this.waitTime}s`;

      if( this.waitTime<=0){
        this.isWaiting = false;
        this.captchaText = "获取验证码";
        this.waitTime=60;
        clearInterval(timer)
      }
    },1000)
  }
}
