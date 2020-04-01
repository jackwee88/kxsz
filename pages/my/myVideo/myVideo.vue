<template>
<view>
<!--pages/my/myVideo/myVideo.wxml-->
  <view class="tabcont" v-if="tabcontitem.length>0">
    <view class="tabcontlist">
      <view class="tabcontitem" v-for="(item, index) in tabcontitem" :key="index" @tap="playVideo" :data-url="item.video" :data-vpid="item.vp_id" :data-browse="item.browse" :data-clid="item.cl_id" :data-title="item.title" :data-index="index">
        <view class="left itemfolt">
          <image class="leftimg" :src="item.image"></image>
        </view>
        <view class="right itemfolt">
          <view class="title">{{item.title}}</view>          
        </view>
      </view>
    </view>
  </view>
  <view v-if="tabcontitem.length==0" style="text-align:center;font-size:32rpx;padding-top:20rpx">暂无已购视频</view>



  
<template is="toTop"></template>
</view>
</template>

<script>
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      id: 1,
      tabcontitem: [],
      goodsList: [],
      keyword: '',
      page: 1,
      page_size: 10,
      count: 1,
      preview: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id,
        tabcontitem: [],
        page: 1
      });
    }

    this.getData();
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
        cl_id: this.id,
        page: that.page,
        page_size: that.page_size
      };

      if (that.count < that.page) {
        wx.showToast({
          title: '暂无更多信息',
          icon: 'none'
        });
      } else {
        util.ajaxs('goods/catalogVideoList', param, res => {
          var tabcontitem = that.tabcontitem;

          if (res.data.list != undefined) {
            that.setData({
              page: that.page + 1,
              page: that.page + 1,
              count: res.data.count > 1 ? res.data.count : 1,
              tabcontitem: tabcontitem.concat(res.data.list)
            });
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
    //     path: 'pages/index/index?myshare=1&tourl=/pages/my/myVideo/myVideo'  // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
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

    goodsdetails(e) {
      const p_id = e.currentTarget.dataset.p_id;
      wx.navigateTo({
        url: '/pages/onlinestore/productDetail/productDetail?p_id=' + p_id
      });
    },

    playVideo(e) {
      this.setData({
        preview: false
      }); // var src = e.currentTarget.dataset.url;
      // wx.navigateTo({
      //   url: '../../my/myVideoContent/myVideoContent?vp_id=' + e.currentTarget.dataset.vpid,
      // })

      const vp_id = e.currentTarget.dataset.vpid;
      const title = e.currentTarget.dataset.title;
      const index = e.currentTarget.dataset.index;
      const browse = e.currentTarget.dataset.browse;
      var param = {
        vp_id: vp_id
      };
      util.ajaxs('videopacks/videopacksLimit', param, res => {
        if (res.status == 1) {
          wx.navigateTo({
            url: '/pages/hncjiaoxue_intro/hncjiaoxue_intro?vp_id=' + vp_id + '&title=' + title + '&vp_id=' + vp_id + '&index=' + index + "&browse=" + browse
          });
        } else if (res.status == 2) {
        }
      });
    },

    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    }

  }
};
</script>
<style>
@import "./myVideo.css";
</style>