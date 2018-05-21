import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Validators } from "../../../validators/validators";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ngOnInit(){
    this.initForm();
  }


  // 初始化表单控件
  initForm() {

    this.registerForm = this.formBuilder.group({
      mobileNum: ["", [Validators.required, Validators.phone]],
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      rePassword: ["", [Validators.required]],
      phoneCode: ["", [Validators.required]]
    });

  }

  back(){
    this.navCtrl.pop();
  }
}
