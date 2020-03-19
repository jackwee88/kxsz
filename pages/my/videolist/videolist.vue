<template>
<view>
<!--pages/my/videoList/videoList.wxml-->
<!--pages/my/myVideo/myVideo.wxml-->
<view class="jhm-btn" @tap.stop="jhmShow">视频激活码兑换</view>
  <view class="tabcont" v-if="tabcontitem.length>0">
    <view class="tabcontlist">
      <view class="tabcontitem" v-for="(item, index) in tabcontitem" :key="index" @tap="toVideoList" :data-id="item.cl_id">
        <view class="left itemfolt">
          <image class="leftimg" :src="item.icon"></image>
        </view>
        <view class="right itemfolt">
          <view class="title">{{item.title}}</view>          
        </view>
      </view>
    </view>
  </view>
  <view v-if="tabcontitem.length==0" style="text-align:center;font-size:32rpx;padding-top:20rpx">暂无数据</view>



  
<template is="toTop"></template>


<view class="bg-grey" v-if="is_code==true">
<view class="popupback-jhm" v-if="is_code==true">

    <view class="popupback_cont-jhm">
      <view class="popupbacktitle-jhm" style="position:relative">提示<text style="position:absolute;coloe:white;top:-34rpx;right:16rpx;font-size:40rpx;display:flex;width:50rpx;justify-content:flex-end" @tap.stop="closeJhm">x</text>
      </view>
      <view class="popuplist-jhm">
        <input placeholder="请输入激活码" style="font-size:32rpx;" type="text" @input="changeInput"></input>
      </view>
      <view class="clickbtn-jhm">

        <button class="close" @tap="buyJhm" style="font-size:24rpx">确认</button>

      </view>
    </view>
  </view>
  </view>
</view>
</template>

<script>
// pages/my/mycollect/mycollect.js
const app = getApp().globalData;
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      code: '',
      currentId: '1',
      tabcontitem: [],
      goodsList: [],
      type: 1,
      keyword: '',
      page: 1,
      page_size: 10,
      count: 1,
      flag: false,
      is_code: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.currentId) {
      this.setData({
        currentId: options.currentId,
        type: options.currentId,
        tabcontitem: [],
        page: 1
      });
    }

    if (wx.getStorageSync('loginToken')) {
      this.getData();
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      page: 1,
      tabcontitem: []
    });
    that.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // alert(123)
    // this.setData({
    //   page: 1,
    //   tabcontitem: []
    // });

    // if (wx.getStorageSync('token')) {
    //   this.getData();
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData();
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element
      }
    },
    getData() {
      var that = this;
      var param = {
        page: that.page,
        page_size: that.page_size
      };

      if (that.count < that.page) {
        wx.showToast({
          title: '暂无更多信息',
          icon: 'none'
        });
      } else {
        util.ajaxs('Goods/buiedVideo', param, res => {
          var tabcontitem = that.tabcontitem;

          if (res.data.list != undefined) {
            that.setData({
              page: that.page + 1,
              page: that.page + 1,
              count: res.data.count > 1 ? res.data.count : 1,
              tabcontitem: tabcontitem.concat(res.data.list)
            });
            console.log(res.data.list);
            wx.stopPullDownRefresh();
          }
        });
      }
    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function () {
    //   return {
    //     title: '开心书写',
    //     path: 'pages/index/index?myshare=1&tourl=/pages/my/videoList/videoList'  // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
    //   }
    // },
    details(e) {
      var that = this;
      let param = {
        vp_id: e.currentTarget.dataset.vp_id
      };
      util.ajaxs('videopacks/videopacksLimit', param, res => {
        wx.navigateTo({
          url: '/pages/hncjiaoxue_intro/hncjiaoxue_intro?vp_id=' + e.currentTarget.dataset.vp_id
        });
      });
    },

    toVideoList(e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/my/myVideo/myVideo?id=' + id
      });
    },

    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    },

    jhmShow() {
      this.setData({
        flag: true,
        is_code: true
      });
    },

    changeInput(e) {
      var val = e.detail.value;
      this.setData({
        code: val
      });
    },

    buyJhm(e) {
      var that = this;
      util.ajaxs('Goods/getShareVideoListBycode', {
        code: this.code
      }, res => {
        wx.showToast({
          title: res.msg,
          mask: true,
          duration: 2000
        });
        this.setData({
          is_code: false
        });
        that.onShow();
      });
    },

    closeJhm() {
      this.setData({
        is_code: false
      });
    }

  }
};
</script>
<style>
@import "./videoList.css";
</style>