import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Validators } from "../../../validators/validators";
import { PersonService } from '../../../providers/person';
/**
 * Generated class for the ModifyPsdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-psd',
  templateUrl: 'modify-psd.html',
})
export class ModifyPsdPage {


  modPsdForm: any;
  captchaText:any = "获取验证码";
  isWaiting:boolean = false; //等验证码
  waitTime:any = 60;
  modPsdErrors = {
    'oldPsd': '',
    'password': '',
    'rePassword':''
  };
  validationMessages: any = {
    'oldPsd': {
      'required': "请输入密码"
    },
    'password': {
      'required': "请输入密码"
    },
    'rePassword': {
      'required': "请再次输入密码",
      'notMatch':"两次输入不一致"
    },
  };
 params:any = {
    old_password:'',
    new_password:''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public personService:PersonService,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad modifyPsdPage');
  }


  ngOnInit(){
    this.initForm();
  }

   // 初始化表单控件
   initForm() {
    this.modPsdForm = this.formBuilder.group({

      password: ["", [Validators.required]],
      rePassword: ["", [Validators.required]],
      oldPsd: ["", [Validators.required]]
    });
    this.modPsdForm.valueChanges.subscribe(data => this.onValueChanged(data, this.modPsdErrors));

  }

  //监控错误
  onValueChanged(data, formError) {
    for (const field in formError) {
      formError[field] = '';
      const control = this.modPsdForm.get(field);
      if (control && control.dirty && !control.valid) {//表单字段已修改或无效
        const messages = this.validationMessages[field];//取出对应字段可能的错误信息
        for (const key in control.errors) { //从errors里取出错误类型，再拼上该错误对应的信息
          messages[key] && (formError[field] += messages[key] + '');
        }
      }
    }

  }
  modifyPsd(){
    if(this.modPsdForm.invalid || this.modPsdForm.controls.password.value != this.modPsdForm.controls.rePassword.value){
      return;
    }

    this.personService.modifyPassword(this.params).subscribe(res =>{
      this.alertCtrl.create({
        title: '温馨提示',
        message: '修改成功！',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
    })
  }
}
