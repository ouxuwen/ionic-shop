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
  //上传license
  uploadLicense(data) {
    return this.base.post('/app/login/addLicense', data);
  }
  //个人资料
  personalData(data) {
    return this.base.post('/app/member/personalData', data);
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
    return this.base.post('/app/member/memberAddressDelete', data);
  }
  //修改会员地址
  updateMemberAddress(data) {
    return this.base.post('/app/member/updateMemberAddress', data);
  }
  //会员地址管理
  memberAddress(data) {
    return this.base.post('/app/member/memberAddress', data);
  }
}
