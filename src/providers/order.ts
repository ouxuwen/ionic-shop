import { Injectable } from '@angular/core';
import { BaseHttpProvider }from './base-http';

@Injectable()
export  class OrderService {
  constructor(
    public base: BaseHttpProvider
  ) {}


  // 创建订单
  createOrder(data){
    return this.base.post('/app/Order/orderCreate', data);
  }


}
