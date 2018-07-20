import { Injectable } from '@angular/core';
import { BaseHttpProvider } from './base-http';

@Injectable()
export class OrderService {
  constructor(
    public base: BaseHttpProvider
  ) { }

  // 订单信息
  orderInfo(data) {
    return this.base.post('/app/Order/orderInfo', data);
  }

  // 创建订单
  createOrder(data) {
    return this.base.post('/app/Order/orderCreate', data);
  }

  //订单列表
  myOrderList(data) {
    return this.base.post('/app/Order/myOrderList', data);
  }

  // 订单详情
  orderDetail(data) {
    return this.base.post('/app/Order/orderDetail', data);
  }

  //物流详情页
  orderExpress(data) {
    return this.base.post('/app/Order/orderExpress', data);
  }

  //查询包裹物流信息
  getOrderGoodsExpressMessage(data) {
    return this.base.post('/app/Order/getOrderGoodsExpressMessage', data);
  }

  //订单项退款详情
  refundDetail(data) {
    return this.base.post('/app/Order/refundDetail', data);
  }

  //申请退款
  orderGoodsRefundAskfor(data) {
    return this.base.post('/app/Order/orderGoodsRefundAskfor', data);
  }

  //买家退货
  orderGoodsRefundExpress(data) {
    return this.base.post('/app/Order/orderGoodsRefundExpress', data);
  }
  //收货
  orderTakeDelivery(data) {
    return this.base.post('/app/Order/orderTakeDelivery', data);
  }
  // 删除订单
  deleteOrder(data) {
    return this.base.post('/app/Order/deleteOrder', data);
  }
  // 订单后期支付页面
  orderPay(data) {
    return this.base.post('/app/Order/orderPay', data);
  }

  //评论
  addGoodsEvaluate(data){
    return this.base.post('/app/Order/addGoodsEvaluate', data);
  }

  //pay
  mobileAlipay(data){
    return this.base.post('/app/pay/mobileAlipay', data);
  }
}
