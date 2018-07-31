import { Injectable } from '@angular/core';
import { BaseHttpProvider } from './base-http';

@Injectable()
export class PersonService {
  constructor(
    public base: BaseHttpProvider
  ) { }


  // 登录
  login(data) {
    return this.base.post('/app/login/appLogin', data);
  }
  // 注册
  register(data) {
    return this.base.post('/app/login/register_login', data);
  }

  // 获取验证码
  getCaptcha(data) {
    return this.base.post('/app/login/getCaptcha', data);
  }
  // 找回密码获取验证码
  getFindCaptcha(data) {
    return this.base.post('/app/login/getFindCaptcha', data);
  }
  //找回密码
  findPassword(data) {
    return this.base.post('/app/login/findPassword', data);
  }

  //上传license
  uploadLicense(data) {
    return this.base.postJson('/app/login/addLicense', data);
  }
  //个人资料
  personalData(data) {
    return this.base.post('/app/member/personalData', data);
  }
  //分销资料
  memberIndexFx(data) {
    return this.base.post('/app/member/memberIndex', data);
  }

  //修改密码
  modifyPassword(data) {
    return this.base.post('/app/member/modifyPassword', data);
  }
  //店铺积分流水
  integralWater(data) {
    return this.base.post('/app/member/integralWater', data);
  }
  // 修改默认会员地址
  updateAddressDefault(data) {
    return this.base.post('/app/member/updateAddressDefault', data);
  }
  //店铺积分列表和平台积分
  integral(data) {
    return this.base.post('/app/member/integral', data);
  }
  //会员地址删除
  memberAddressDelete(data) {
    return this.base.post('/app/member/memberAddressDelete', data);
  }
  //获取用户地址详情
  getMemberAddressDetail(data) {
    return this.base.post('/app/member/getMemberAddressDetail', data);
  }
  //添加地址
  addMemberAddress(data) {
    return this.base.post('/app/member/addMemberAddress', data);
  }
  //修改会员地址
  updateMemberAddress(data) {
    return this.base.post('/app/member/updateMemberAddress', data);
  }
  //会员地址管理
  memberAddress(data, bol?) {
    return this.base.post('/app/member/memberAddress', data, bol);
  }
  //领取优惠券
  getCoupon(data) {
    return this.base.post('/app/index/getCoupon', data);
  }
  //我的优惠券
  memberCoupon(data) {
    return this.base.post('/app/member/memberCoupon', data);
  }

  //我的收藏
  myCollection(data) {
    return this.base.post('/app/member/myCollection', data);
  }

  // 修改用户名
  modifyProfile(data) {
    return this.base.postJson('/app/member/modifyProfile', data);
  }

  // 分销总消费
  getLevelPoint(data) {
    return this.base.post('/app/member/getLevelPoint', data);
  }

  // 获得分销1级
  getLevelOne(data) {
    return this.base.post('/app/member/getLevelOne', data);
  }

  // 获得分销2级
  getLevelTwo(data) {
    return this.base.post('/app/member/getLevelTwo', data);
  }
  //签到
  signIn(data) {
    return this.base.post('/app/member/signIn', data);
  }

  //提交咨询
  addConsult(data) {
    return this.base.post('/app/member/addConsult', data);
  }

  // 咨询列表
  consultList() {
    return this.base.post('/app/member/consultList', {});
  }

}
