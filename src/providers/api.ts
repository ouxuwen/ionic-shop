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
  //商品详情
  goodsDetail(data){
    return this.base.post('/app/Goods/goodsDetail',data);
  }

  // 添加购物车
  addCart(data){
    return this.base.post('/app/Goods/addCart',data);
  }

  //购物车
  cart(data){
    return this.base.post('/app/Goods/cart',data);
  }
}
