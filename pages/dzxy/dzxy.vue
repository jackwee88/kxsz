<template>
<view>
<view class="title">{{dzxy}}</view>
<view class="content" style="padding-left:48rpx;padding-right:40rpx" v-html="article_article"></view>
</view>
</template>

<script>
var util = require("../../utils/util.js");


export default {
  data() {
    return {
      data: '',
      dzxy: '',
      article_article: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dzxyFun();
    this.dzxy1();
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
    dzxy1() {
      var that = this;
      util.ajax({
		  url:'index/getSystemDesc', 
		  data:{
		    type: 5
		  }, 
		  success:res => {
		    that.dzxy= res.data
		  }
	  });
    },

    dzxyFun() {
      var that = this;
      util.ajax({
		  url:'index/getSystem', 
		  data:{
		    type: 5
		  }, 
		  success:res => {
		    //WxParse.wxParse('article', 'html', res.data, that, 5)
		    setTimeout(() => {
		      that.article_article = res.data;
		    }, 200);
		  }
	  });
    }

  }
};
</script>
<style>
@import "./dzxy.css";
</style>