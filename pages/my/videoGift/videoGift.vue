<template>
<!--pages/my/splb/splb.wxml-->

<view class="wrap">
  <navigator class="item" v-for="(item, index) in dataList" :key="index" :url="'/pages/my/jhm/jhm?cl_id=' + item.cl_id">{{item.title}}</navigator>
</view>
</template>

<script>
// pages/my/splb/splb.js
const app = getApp().globalData;
var util = require("../../../utils/util.js");
import {ajax} from '../../../utils/public.js'
export default {
  data() {
    return {
      dataList: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
      ajax({url:'videopacks/videopacksList', data:{
        md_id: 7
      },success:(res) => {
          this.dataList= res.data.data.catalog
      }});
    }

  }
};
</script>
<style>
@import "./videoGift.css";
</style>