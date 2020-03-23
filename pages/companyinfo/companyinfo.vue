<template>
<!--pages/companyInfo/companyInfo.wxml-->
<view>
<view class="item" style="margin-top:40rpx;" @tap.stop="toOther" v-for="(item, index) in list" :key="index" :data-id="item.id">{{item.name}}</view>

</view>
</template>

<script>
// pages/companyInfo/companyInfo.js
var app = getApp().globalData;
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      list: [],
      pid: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pid: options.id
    });
    this.getData();
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
  methods: {
    toOther(e) {
      wx.navigateTo({
        url: '/pages/otherInfo/otherInfo?id=' + e.currentTarget.dataset.id
      });
    },

    getData() {
      var that = this;
      util.ajax('/api/partner/partnerSeCate', {
        pid: this.pid
      }, res => {
        that.setData({
          list: res.data.list
        });
      });
    }

  }
};
</script>
<style>
@import "./companyInfo.css";
</style>