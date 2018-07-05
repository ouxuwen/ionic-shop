import { Injectable } from '@angular/core';
import { BaseHttpProvider }from './base-http';

@Injectable()
export  class PersonService {
  constructor(
    public base: BaseHttpProvider
  ) {}


  // 登录
  login(data){
    return this.base.post('/app/login/appLogin',data);
  }
  // 注册
   register(data){
    return this.base.post('/app/login/register_login',data);
  }
  //上传license
  uploadLicense(data){
    return this.base.post('/app/login/addLicense',data);
  }
  //找回密码


}
