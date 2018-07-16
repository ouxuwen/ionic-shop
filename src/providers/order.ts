import { Injectable } from '@angular/core';
import { BaseHttpProvider }from './base-http';

@Injectable()
export  class OrderService {
  constructor(
    public base: BaseHttpProvider
  ) {}

  // 订单信息
  orderInfo(data){
    return this.base.post('/app/Order/orderInfo', data);
  }

  // 创建订单
  createOrder(data){
    return this.base.post('/app/Order/orderCreate', data);
  }

  //订单列表
  myOrderList(data){
    return this.base.post('/app/Order/myOrderList', data);
  }



}
