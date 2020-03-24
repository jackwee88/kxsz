<template>
<!--pages/shjsDetail/shjs_detail.wxml-->
<view class="wrap">
  <view class="top" v-if="info.nickname">
    <image :src="info.avatar" class="header clear"></image>
    <view class="info" v-if="info.nickname">
      <view>
        <text class="nickname">{{info.nickname}}</text>
       
      </view>
    
      <view class="time">
        <text>发布时间：</text>
        <text>{{info.createtime}}</text>
      </view>
    </view>
  </view>
  <view class="content-image">
  <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000" style="height:331px;">
    <block v-for="(item, index) in bannerUrl" :key="index">
      <swiper-item>
        <image :src="item" mode="scaleToFill" :data-type="item.jump_type"></image>
      </swiper-item>
    </block>
  </swiper>
  </view>
  <view class="content">{{info.content}}</view>
</view>
</template>

<script>
// pages/shjsDetail/shjs_detail.js
const app = getApp().globalData;
// var util = require("../../utils/util.js");
import {ajax} from '../../../utils/public.js'
export default {
  data() {
    return {
      bannerUrl: [],
      info: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.ajax({url:'works/worksDetails', data:{
      id: options.id
    },success:(res)  => {
        this.bannerUrl= res.data.picture_arr,
        this.info= res.data
    }});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {}
};
</script>
<style>
@import "./shjs_detail.css";
</style>