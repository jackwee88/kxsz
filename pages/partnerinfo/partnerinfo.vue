<template>
<view>
<!--pages/otherInfo/otherInfo.wxml-->
<view class="title">{{detail.name}}</view>
<rich-text :nodes="detail.content"></rich-text>
</view>
</template>

<script>
// pages/otherInfo/otherInfo.js
var app = getApp().globalData;
var util = require("../../utils/util.js");
import {ajax} from '../../utils/public.js'
export default {
  data() {
    return {
      id: 0,
      detail: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.id= options.id
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
    getData() {
      var that = this;
      ajax({url:'partner/partner',data: {
        id: this.id
      }, success:(res) => {
          this.detail= res.data.data
      }});
    }

  }
};
</script>
<style>
@import "./otherInfo.css";
</style>
