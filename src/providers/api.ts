import { Injectable } from '@angular/core';
import { BaseHttpProvider }from './base-http';

@Injectable()
export  class ApiService {
  constructor(
    public base: BaseHttpProvider
  ) {}

  // 首页
  index(){
    return this.base.post('/app/index/index');
  }
  // 显示折扣
  discount(){
    return this.base.post('/app/index/discount');
  }

}
