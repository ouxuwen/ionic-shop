import { Injectable } from '@angular/core';
import { BaseHttpProvider } from './base-http';

@Injectable()
export class GoodsService {
  constructor(
    public base: BaseHttpProvider
  ) { }

  // 首页
  index() {
    return this.base.post('/app/index/index');
  }
  // 显示折扣
  discount() {
    return this.base.post('/app/index/discount');
  }
  //商品详情
  goodsDetail(data) {
    return this.base.post('/app/Goods/goodsDetail', data);
  }

  // 添加购物车
  addCart(data) {
    return this.base.post('/app/Goods/addCart', data);
  }

  //购物车
  cart(data, bol = true) {
    return this.base.post('/app/Goods/cart', data, bol);
  }

  //添加收藏
  addFavorites(data) {
    return this.base.post('/app/Member/FavoritesGoodsorshop', data, false);
  }

  //取消收藏
  cancelFavorites(data) {
    return this.base.post('/app/Member/cancelFavorites', data, false);
  }

  // 获取商品分类下的商品
  getCategoryChildGoods(data) {
    return this.base.post('/app/Goods/getCategoryChildGoods', data);
  }

  /**
    * 根据条件查询商品列表：商品分类查询，关键词查询，价格区间查询，品牌查询
    * 创建人：MJ
    * 创建时间：2017年2月24日 16:55:05
    * $category_id, $brand_id, $min_price, $max_price, $page, $page_size, $order, $attr_array, $spec_array
    */
  goodsList(data) {
    return this.base.post('/app/Goods/goodsList', data);
  }

  /**
  * 品牌专区
  */
  brandlist(data) {
    return this.base.post('/app/Goods/brandlist', data);
  }

  /**
   * 搜索商品显示
   */
  goodsSearchList(data) {
    return this.base.post('/app/Goods/goodsSearchList', data);
  }
  /**
   * 商品分类列表
   */
  goodsCategoryList(data) {
    return this.base.post('/app/Goods/goodsCategoryList', data);
  }

  //  购物车修改数量
  cartAdjustNum(data) {
    return this.base.post('/app/Goods/cartAdjustNum', data, false);
  }

  // 删除购物车
  cartDelete(data) {
    return this.base.post('/app/Goods/cartDelete', data, false);
  }

  // 功能：商品评论
  getGoodsComments(data) {
    return this.base.post('/app/Goods/getGoodsComments', data);
  }

  // 领取商品优惠券
  getCoupon(data) {
    return this.base.post('/app/Goods/receiveGoodsCoupon', data);
  }

  //文章中心
  articleCenter(data) {
    return this.base.post('/app/Articlecenter/index', data);
  }

  // 文章分类
  getArticleList(data) {
    return this.base.post('/app/Articlecenter/getArticleList', data);
  }

  // 文章内容
  articleContent(data) {
    return this.base.post('/app/Articlecenter/articleContent', data);
  }
}
